'use client'
import DeleteRecipeImage from '@/actions/delete-recipe-image-action'
import { RecipeFormValues, recipeSchema } from '@/actions/schemas'
import UpdateRecipe from '@/actions/update-recipe-action'
import ErrorMessage from '@/components/UI/ErrorMessage'
import { createClient } from '@/lib/supabase/browserClient'
import { getCategories } from '@/lib/supabase/queries'
import { RecipeImage } from '@/types/recipe'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'


interface EditRecipeProps {
  recipeId: string,
  defaultValues: { title: string; category: string; ingredients: string; instructions: string },
  currentImages: RecipeImage[]
}

const EditRecipeForm = ({ recipeId, defaultValues, currentImages }: EditRecipeProps) => {
  const supabase = createClient()
  const queryClient = useQueryClient()
  const router = useRouter()
  const [images, setImages] = useState(currentImages)

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await getCategories(supabase);
      if (error) throw new Error(error.message);
      return data;
    },
  });

  const editImagesSchema = recipeSchema.omit({ images: true }).extend({ images: z.custom<FileList>().optional().refine(files => !files || files.length <= 4, 'Up to 4 images') })
  type RecipeFormInput = z.infer<typeof editImagesSchema>

  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormInput>({
    resolver: zodResolver(editImagesSchema),
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

  const deleteImageMutation = useMutation({
    mutationFn: (imageId: string) => DeleteRecipeImage(imageId),
    onError: (error) => toast.error(error.message),
    onSuccess: (_, imageId) => {
      setImages((prev) => prev.filter((img) => img.id !== imageId))
      toast('Photo removed')
    },
  })

  return (
    <div className='mx-auto max-w-2xl px-4 py-10 md:py-16'>
      <h1 className='font-display text-3xl text-text-primary md:text-4xl'>
        Edit a recipe
      </h1>

      <div className='mt-6 flex flex-col gap-3'>
        <span className='text-sm font-medium uppercase text-text-primary'>Current photos</span>
        {images.length > 0 ? (
          <div className='flex flex-wrap gap-3'>
            {images.map(i => (
              <div key={i.id} className='relative h-20 w-20 overflow-hidden rounded-lg'>
                <img src={i.image_path} alt='' className='h-full w-full object-cover' />
                <button
                  type='button'
                  onClick={() => deleteImageMutation.mutate(i.id)}
                  disabled={deleteImageMutation.isPending}
                  aria-label='Remove photo'
                  className='absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-two text-xs text-white'>
                  x
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-sm text-text-primary/50'>No photos yet.</p>
        )}
      </div>

      <form onSubmit={handleSubmit(values => {
        mutate({
          title: values.title,
          ingredients: values.ingredients,
          instructions: values.instructions,
          category: values.category,
          images: values.images ? Array.from(values.images) : undefined
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
          <textarea {...register('ingredients')} id='ingredients' rows={6} placeholder={`1 cup flour\n2 eggs\n- ...`}
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.ingredients && <ErrorMessage error={errors.ingredients.message!} />}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='instructions' className='text-sm font-medium uppercase text-text-primary'>
            Instructions
          </label>
          <textarea {...register('instructions')} id='instructions' rows={8} placeholder={`Preheat oven...\nMix...\n...`}
            className='rounded-lg border border-text-primary/20 bg-background px-3 py-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.instructions && <ErrorMessage error={errors.instructions.message!} />}
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='image' className='text-sm font-medium uppercase'>Change Image:</label>
          <input type="file" multiple {...register('images')} className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.images && <ErrorMessage error={errors.images.message!} />}
        </div>

        <button type='submit' disabled={isPending} className='bg-accent-three rounded text-white p-4 w-fit mx-auto'>
          {isPending ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

export default EditRecipeForm;