import { RecipeCommentsType } from "@/lib/supabase/queries"
import { CommentArray } from "@/types/comments"

const buildNestedComment = (list: RecipeCommentsType): CommentArray[] => {
  const groupById = new Map<string, CommentArray>()
  list.forEach((comment) => groupById.set(comment.id, { ...comment, children: [] }))

  const roots: CommentArray[] = []
  groupById.forEach((comment) => {
    if (comment.parent_comment_id) {
      const parent = groupById.get(comment.parent_comment_id)
      parent?.children.push(comment)
    } else {
      roots.push(comment)
    }
  })

  return roots
}

export default buildNestedComment;