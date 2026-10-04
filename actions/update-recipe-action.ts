'use server'

import uploadImage from "@/lib/supabase/upload-image"
import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"

const UpdateRecipe = async (recipeId: string, postData: RecipeFormValues) => {
  const supabase = await createClient()
  const { images, ...parsedData } = recipeSchema.parse(postData)

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized access')

  const { data, error } = await supabase.from('recipes').update({
    ...parsedData
  })
    .eq('id', recipeId)
    .eq('author', user.id)
    .select()
    .single()

  if (error) throw error

  if (images && images.length > 0) {
    const { data: existingImage } = await supabase
      .from('recipe_images')
      .select('position')
      .eq('recipe_id', recipeId)
      .order('position', { ascending: false })
      .limit(1)
      .maybeSingle()

    const startPosition = (existingImage?.position ?? 0) + 1
    const imageURLs = await Promise.all(images.map(i => uploadImage(i)))
    const { error: imageError } = await supabase.from('recipe_images')
      .insert(
        imageURLs.map((path, i) => ({
          recipe_id: recipeId,
          image_path: path,
          position: startPosition + i
        })))

    if (imageError) throw imageError
  }

  return data
}

export default UpdateRecipe;