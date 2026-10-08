'use server'
import { createClient } from "@/lib/supabase/serverClient"

interface CreateCommentInput {
  recipeId: string,
  contentData: string,
  parentCommentId?: string | null
}

const CreateComment = async ({ recipeId, contentData, parentCommentId }: CreateCommentInput) => {
  const supabase = await createClient()
  

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unathorized access')

  const { data, error } = await supabase
    .from('comments')
    .insert({
      recipe_id: recipeId,
      author: user.id,
      parent_comment_id: parentCommentId ?? null,
      content:contentData
    })
    .select('id, content, created_at, parent_comment_id, author:users(id, username)')
    .single()

  if (error) throw error
  return data
}

export default CreateComment