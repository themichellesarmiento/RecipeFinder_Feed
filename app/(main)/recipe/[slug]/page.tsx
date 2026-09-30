import { getSingleRecipe } from '@/lib/supabase/queries';
import { createClient } from '@/lib/supabase/serverClient';
import Link from 'next/link';
import DeleteButton from '../deleteButton';

const Recipe = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const supabase = await createClient()
  const { slug } = await params
  const { data: recipe, error } = await getSingleRecipe(slug, supabase)

  const { data: { user } } = await supabase.auth.getUser()
  const isAuthor: boolean = user && recipe && user.id === recipe.author.id ? true : false

  if (error) {
    return (
      <p className='mt-4 text-accent-two'>
        Something went wrong: {error.message}
      </p>
    )
  }

  if (!recipe) {
    return (
      <p className='mt-4 text-text-primary/70'>
        Recipe not found
      </p>
    )
  }

  return (
    <div className='mx-auto max-w-3xl px-4 py-10 md:py-16'>
      <Link
        href='/' className='text-base text-text-primary/60 transition-colors hover:text-text-primary'>
        ← Back to recipes
      </Link>

      {recipe && (
        <>
          <div className='relative mt-4 aspect-video overflow-hidden rounded-2xl'>
            <Link href={`/category/${encodeURIComponent(recipe.category.name)}`} className='absolute left-3 top-3 rounded-full px-3 py-1 text-base md:text-lg font-medium text-accent-three/90'>{recipe.category.name}</Link>
          </div>
          <h1 className='mt-6 text-2xl md:text-3xl'>{recipe.title}</h1>
          <div className='mt-4 flex items-center gap-2'>
            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-text-primary text-sm font-medium text-background'>
              {recipe.author.username.charAt(0).toUpperCase()}
            </span>
            <span className='text-base text-text-primary/70'> by {recipe.author.username}</span>
          </div>
          <div className='mt-6 flex flex-col gap-4'>
            <h2 className='text-xl font-medium'>Ingredients</h2>
            <ul className='flex list-inside list-disc flex-col gap-2 marker:text-accent-three text-base font-light'>
              {recipe.ingredients.split('\n').map((item, i) => (
                <li key={i} className='text-text-primary/85'>{item}</li>
              ))}
            </ul>
            <h2 className='mb-3 mt-6 text-xl font-medium'>Instructions</h2>
            <ol className='flex list-inside list-decimal flex-col gap-3 marker:font-bold marker:text-accent-two text-base md:text-lg'>
              {recipe.instructions.split('\n').map((step, i) => (
                <li key={i} className='text-text-primary/85'>{step}</li>
              ))}
            </ol>
            {isAuthor &&
              <div className='flex gap-2 mx-auto'>
                <DeleteButton id={recipe.id} />
                <Link href={`/recipe/${recipe.slug}/edit`} className='bg-accent-three rounded text-white p-4 w-fit'>Edit Recipe</Link>
              </div>
            }
          </div>
        </>
      )}
    </div>
  )
}

export default Recipe;