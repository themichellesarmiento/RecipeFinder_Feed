import RecipeCard from "@/components/Recipe/RecipeCard"
import { getRecipesByCategory } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"

const RecipesByCategory = async ({ params }: { params: Promise<{ name: string }> }) => {
  const supabase = await createClient()
  const { name } = await params
  const categoryName = decodeURIComponent(name)
  const { data: recipes, error } = await getRecipesByCategory(categoryName, supabase)

  if (error) {
    return (
      <p className='mt-4 text-accent-two'>
        Something went wrong: {error.message}
      </p>
    )
  }

  if (!recipes || recipes.length === 0) {
    return (
      <p className='mt-4 text-text-primary/70'>
        No recipes found in this category:{categoryName}
      </p>
    )
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-6'>
      <h1 className='text-2xl md:text-3xl text-center'>
        {name} cuisines
      </h1>
      <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-3'>
        {recipes.map((p, index) => (
          <RecipeCard recipe={p} key={index} />
        ))}
      </div>
    </div>
  )
}

export default RecipesByCategory