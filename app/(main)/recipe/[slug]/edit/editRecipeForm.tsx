'use client'
import { RecipeFormValues, recipeSchema } from '@/actions/schemas'
import UpdateRecipe from '@/actions/update-recipe-action'
import ErrorMessage from '@/components/UI/ErrorMessage'
import { createClient } from '@/lib/supabase/browserClient'
import { getCategories } from '@/lib/supabase/queries'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

interface EditRecipeProps {
  recipeId: string,
  defaultValues: RecipeFormValues,
  currentImagePath: string | null
}

const EditRecipeForm = ({ recipeId, defaultValues, currentImagePath }: EditRecipeProps) => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await getCategories(supabase);
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const postImageSchema = recipeSchema.omit({ image: true }).extend({ image: z.unknown().transform(value => { return value as FileList }).optional() })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(postImageSchema),
    defaultValues
  })

  const { mutate, error: serverSideError, isPending } = useMutation({
    mutationFn: (values: RecipeFormValues) => UpdateRecipe(recipeId, values),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['home-recipes'] });
      toast('Recipe successfully edited');
      router.push(`/recipe/${data.slug}`);
    },
  })
  return (
    <div className='mx-auto max-w-2xl px-4 py-10 md:py-16'>
      <h1 className='font-display text-3xl text-text-primary md:text-4xl'>
        Edit a recipe
      </h1>
      <form onSubmit={handleSubmit(values => {
        let imageForm: FormData | undefined = undefined
        if (values.image && values.image.length > 0) {
          imageForm = new FormData()
          imageForm.append('image', values.image[0])
        }
        mutate({
          title: values.title,
          ingredients: values.ingredients,
          instructions: values.instructions,
          category: values.category,
          image: imageForm
        }
        )
      })}
        className='flex flex-col gap-5'>
        {serverSideError && <ErrorMessage error={serverSideError.message} />}
        <div className='flex flex-col gap-1'>
          <label htmlFor='title' className='text-sm font-medium uppercase text-text-primary'>Title</label>
          <input {...register('title')} id='title' placeholder='Classic Margherita Pizza' className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.title && <ErrorMessage error={errors.title.message!} />}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='category' className='text-sm font-medium uppercase text-text-primary'>Category</label>
          <select {...register('category')} id='category' disabled={categoriesLoading} defaultValue=''
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one'>
            <option value='' disabled>
              {categoriesLoading ? 'Loading categories...' : 'Choose a category'}
            </option>
            {categories?.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && <ErrorMessage error={errors.category.message!} />}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='ingredients' className='text-sm font-medium uppercase text-text-primary'>
            Ingredients
          </label>
          <textarea {...register('ingredients')} id='ingredients' rows={6} placeholder={`- 1 cup flour\n- 2 eggs\n- ...`}
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.ingredients && <ErrorMessage error={errors.ingredients.message!} />}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='instructions' className='text-sm font-medium uppercase text-text-primary'>
            Instructions
          </label>
          <textarea {...register('instructions')} id='instructions' rows={8} placeholder={`1. Preheat oven...\n2. Mix...\n...`}
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.instructions && <ErrorMessage error={errors.instructions.message!} />}
        </div>
        {currentImagePath &&
          <img src={currentImagePath} height={200} width={200} alt={defaultValues.title} />}
        <div className='flex flex-col gap-1'>
          <label htmlFor='image' className='text-sm font-medium uppercase'>Change Image:</label>
          <input type="file" {...register('image')} className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.image && <ErrorMessage error={errors.image.message!} />}
        </div>

        <button type='submit' disabled={isPending} className='bg-accent-three rounded text-white p-4 w-fit mx-auto'>
          {isPending ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

export default EditRecipeForm;