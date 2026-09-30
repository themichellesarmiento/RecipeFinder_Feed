'use server'

import { RecipeFormValues, recipeSchema } from "./schemas"
import { createClient } from "@/lib/supabase/serverClient"
import { slugify } from "@/lib/supabase/generateSlug"


const CreateRecipe = async (postData: RecipeFormValues) => {
  const supabase = await createClient()
  const parsedData = recipeSchema.parse(postData)
  const slug = slugify(parsedData.title)
  const content = `Ingredients:\n${parsedData.ingredients}\n\nInstructions:\n${parsedData.instructions}`;


  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Unauthorized access')

    const { data, error } = await supabase.from('recipes').insert({
      author: user.id,
      slug,
      content,
      title:parsedData.title,
      category:parsedData.category
    })
    .select()
    .single()
    
    if (error) throw error

    return data
  }

export default CreateRecipe;