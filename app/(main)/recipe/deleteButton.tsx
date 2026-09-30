'use client'
import { DeleteRecipe } from "@/actions/delete-recipe.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteButton = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate, isPending } = useMutation({
  mutationFn: DeleteRecipe,
  onError: (error) => {
    toast.error(error.message); 
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['home-recipes'] });
    toast('Recipe successfully deleted');
    router.push('/');
  },
})

  return (
    <button onClick={() => mutate(id)} disabled={isPending}
      className='bg-accent-two rounded text-white p-4 w-fit'>{isPending ? 'Deleting..' : 'Delete Recipe'}
    </button>
  )
}

export default DeleteButton;