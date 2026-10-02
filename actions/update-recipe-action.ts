'use server'

import uploadImage from "@/lib/supabase/upload-image"
import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { revalidatePath } from "next/cache"

const UpdateRecipe = async (recipeId: string, postData: RecipeFormValues) => {
  const supabase = await createClient()
  const { image, ...parsedData } = recipeSchema.parse(postData)

  const imageFile = postData.image?.get('image')
  if (imageFile && !(imageFile instanceof File)) {
    throw new Error('Image is not a valid file')
  }

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

  if (imageFile instanceof File) {
    const imageUrl = await uploadImage(imageFile)

    const { data: existingImage } = await supabase
      .from('recipe_images')
      .select('id')
      .eq('recipe_id', recipeId)
      .eq('position', 1)
      .maybeSingle()

    if (existingImage) {
      const { error: imageError } = await supabase
        .from('recipe_images')
        .update({ image_path: imageUrl })
        .eq('id', existingImage.id)

      if (imageError) throw imageError
    } else {
      const { error: imageError } = await supabase
        .from('recipe_images')
        .insert({ recipe_id: recipeId, image_path: imageUrl, position: 1 })

      if (imageError) throw imageError
    }
  }

  return data
}

export default UpdateRecipe;