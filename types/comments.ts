interface CommentAuthor {
  id: string
  username: string
}

export interface SingleComment {
  id: string
  content: string
  created_at: string
  parent_comment_id: string | null
  author: CommentAuthor
}

export interface CommentArray extends SingleComment {
  children: CommentArray[]
}

export interface CommentSectionProps {
  recipeId: string,
  recipeAuthorId: string,
  userId: string | null
}

export interface CommentItemProps extends CommentSectionProps {
  comment: CommentArray,
  onReply: (content: string, parentId: string) => void,
  onDelete: (id: string) => void,
  isMutating: boolean,
  indent?: number
}