'use server'

import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { slugify } from "@/lib/supabase/generateSlug"
import uploadImage from "@/lib/supabase/upload-image"

const CreateRecipe = async (postData: RecipeFormValues) => {
  const supabase = await createClient()
  const { images, ...parsedData } = recipeSchema.parse(postData)
  const slug = slugify(parsedData.title)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized access')

  const { data, error } = await supabase.from('recipes').insert({
    author: user.id,
    slug,
    title: parsedData.title,
    category: parsedData.category,
    instructions: parsedData.instructions,
    ingredients: parsedData.ingredients
  })
    .select()
    .single()

  if (error) throw error

  if (images && images.length > 0) {
    const imageURLs = await Promise.all(images.map(i => uploadImage(i)))
    const { error: imageError } = await supabase.from('recipe_images')
      .insert(
        imageURLs.map((path, i) => ({
          recipe_id: data.id,
          image_path: path,
          position: i + 1
        })))

    if (imageError) throw imageError;
  }

  return data
}

export default CreateRecipe;