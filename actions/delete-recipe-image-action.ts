'use server'
import { createClient } from "@/lib/supabase/serverClient";

const DeleteRecipeImage = async (imageId: string) => {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized access')

  const { error } = await supabase.from('recipe_images').delete().eq('id', imageId)

  if (error) throw error
  return { success: true }

}

export default DeleteRecipeImage;