'use server'

import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"

const UpdateRecipe = async (recipeId: string, postData: RecipeFormValues) => {
  const supabase = await createClient()
  const parsedData = recipeSchema.parse(postData)
  const content = `Ingredients:\n${parsedData.ingredients}\n\nInstructions:\n${parsedData.instructions}`;

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized access')

  const { data, error } = await supabase.from('recipes').update({
    content,
    title: parsedData.title,
    category: parsedData.category
  })
    .eq('id', recipeId)
    .eq('author', user.id)
    .select()
    .single()

  if (error) throw error

  return data
}

export default UpdateRecipe;