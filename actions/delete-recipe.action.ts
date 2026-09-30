'use server'
import { createClient } from "@/lib/supabase/serverClient"

export const DeleteRecipe = async (postId: string) => {
  const supabase = await createClient()
  await supabase.from('recipes').delete().eq('id', postId).throwOnError()

  return { success: true }
}