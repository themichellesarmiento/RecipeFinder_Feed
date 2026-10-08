'use client'
import { CommentFormValues, commentSchema } from '@/actions/schemas';
import { createClient } from '@/lib/supabase/browserClient';
import { getComments } from '@/lib/supabase/queries';
import { CommentSectionProps, SingleComment } from '@/types/comments';
import buildNestedComment from '@/utils/buildNestedComment';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorMessage from '../UI/ErrorMessage';
import CreateComment from '@/actions/create-comment-action';
import { toast } from 'sonner';
import DeleteComment from '@/actions/delete-comment-action';
import CommentItem from './Item';
import { useForm } from 'react-hook-form';

const CommentSection = ({ recipeId, recipeAuthorId, userId }: CommentSectionProps) => {
  const supabase = createClient()
  const queryClient = useQueryClient()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema)

  })

  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments', recipeId],
    queryFn: async () => {
      const { data, error } = await getComments(recipeId, supabase)
      if (error) throw new Error
      return data as SingleComment[]
    }
  })

  const { mutate: createMutation, isPending } = useMutation({
    mutationFn: CreateComment,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] })
    },
    onSettled: () => reset()
  })

  const deleteMutation = useMutation({
    mutationFn: DeleteComment,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', recipeId] })
      toast('Comment successfully deleted')
    }
  })

  const nestedComments = buildNestedComment(comments ?? [])

  return (
    <div className='mt-8 border-t border-text-primary/10 pt-8'>
      <h2 className='text-xl'>Comments:</h2>

      {userId ? (
        <form onSubmit={handleSubmit(values => createMutation({
          contentData: values.content,
          recipeId
        }))}
          className='mt-4 flex flex-col gap-2'>
          <textarea {...register('content')} placeholder='Add a comment...' className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.content && <ErrorMessage error={errors.content.message!} />}
          <button type='submit' disabled={isPending} className='w-fit rounded bg-accent-one px-4 py-2 text-base font-medium text-background disabled:opacity-60'>
            {isPending ? 'Posting...' : 'Post comment'}
          </button>
        </form>
      ) : (
        <p className='mt-4 text-base text-text-primary/70'>Log in to leave a comment</p>
      )
      }
      <div className='mt-6 flex flex-col gap-4'>
        {isLoading && <p className='text-base text-text-primary/60'>Loading comments...</p>}
        {isLoading && nestedComments.length === 0 && (
          <p className='text-base text-text-primary/60'>No comments yet. Share your thoughts</p>
        )}
        {nestedComments.map(c => (
          <CommentItem key={c.id} comment={c} recipeId={recipeId} recipeAuthorId={recipeAuthorId} userId={userId}
            onReply={(content, parentId) => createMutation({ recipeId, contentData: content, parentCommentId: parentId })}
            onDelete={(id) => deleteMutation.mutate(id)}
            isMutating={isPending || deleteMutation.isPending} />
        ))}
      </div>

    </div>
  )
}

export default CommentSection;