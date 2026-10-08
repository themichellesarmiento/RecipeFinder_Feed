'use client'
import { CommentFormValues, commentSchema } from '@/actions/schemas';
import ErrorMessage from '@/components/UI/ErrorMessage';
import { CommentItemProps } from '@/types/comments';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


const CommentItem = ({ comment, recipeId, recipeAuthorId, userId, onReply, onDelete, isMutating, indent = 0 }: CommentItemProps) => {
  const [reply, setReply] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema)
  })

  const authorizedToDelete = userId === comment.author.id || userId === recipeAuthorId

  const handleOnReply = handleSubmit(values => {
    onReply(values.content, comment.id),
      reset(),
      setReply(false)
  })

  return (
    <div style={{ marginLeft: indent * 24 }} className='flex flex-col gap-2'>
      <div className='rounded-lg border border-text-primary/10 p-3'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-base font-medium'>{comment.author.username}</span>
          <span className='text-sm text-text-primary/40'>
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>
        <p className='text-base text-text-primary/85 mt-1'>{comment.content}</p>

        <div className='flex gap-3 mt-2'>
          {userId
            && (
              <button type='button' onClick={() => setReply((r) => !r)} className='text-xs font-medium text-accent-one'>
                Reply
              </button>
            )}
          {authorizedToDelete && (
            <button type='button' onClick={() => onDelete(comment.id)} disabled={isMutating} className='text-xs font-medium text-accent-two'>
              Delete
            </button>
          )}
        </div>

        {reply && (
          <form onSubmit={handleOnReply} className='mt-2 flex flex-col gap-2'>
            <textarea  {...register('content')} placeholder={`Reply to ${comment.author.username}...`} className='rounded-lg border border-text-primary/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-one' />
            {errors.content && <ErrorMessage error={errors.content.message!} />}
            <button type='submit' disabled={isMutating} className='w-fit rounded bg-accent-one px-3 py-1.5 text-xs font-medium text-background disabled:opacity-60'>
              Post reply
            </button>
          </form>
        )}
      </div>

      {comment.children.map((child) => (
        <CommentItem key={child.id} comment={child} recipeId={recipeId} recipeAuthorId={recipeAuthorId}
          userId={userId} onReply={onReply} onDelete={onDelete} isMutating={isMutating} indent={indent + 1} />
      ))}
    </div>
  )
}
export default CommentItem;