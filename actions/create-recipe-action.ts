'use server'

import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { slugify } from "@/lib/supabase/generateSlug"
import uploadImage from "@/lib/supabase/upload-image"

const CreateRecipe = async (postData: RecipeFormValues) => {
  const supabase = await createClient()
  const { image, ...parsedData } = recipeSchema.parse(postData)
  const slug = slugify(parsedData.title)

  const imageFile = postData.image?.get('image')

  if (!(imageFile instanceof File) && imageFile !== null && imageFile !== 'undefined') {
    throw Error('Image is not a valid format')
  }

  const imageUrl = imageFile && imageFile !== 'undefined' ? await uploadImage(imageFile) : null

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

  if (imageUrl) {
    const { error: imageError } = await supabase.from('recipe_images').insert({
      recipe_id: data.id,
      image_path: imageUrl,
      position: 1
    })

    if (imageError) throw imageError;
  }

  return data
}

export default CreateRecipe;