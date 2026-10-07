'use server'
import { createClient } from "@/lib/supabase/serverClient"

const DeleteComment = async (commentId: string) => {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized access')

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) throw error
  return { success: true }
}

export default DeleteComment