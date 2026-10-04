import { getMoreFromAuthor } from "@/lib/supabase/queries"
import { createClient } from "@/lib/supabase/serverClient"
import RecipeCard from "../RecipeCard"

interface MoreFromAuthorProps {
  authorId: string,
  userName: string,
  currentRecipeId: string
}
const MoreFromAuthor = async ({ authorId, userName, currentRecipeId }: MoreFromAuthorProps) => {
  const supabase = await createClient()
  const { data: recipes } = await getMoreFromAuthor(authorId, currentRecipeId, supabase)

  if (!recipes || recipes.length === 0) return null

  return (
    <div className='mt-8 border-t border-text-primary/20 pt-4'>
      <h2 className='text-xl'>More from {userName}</h2>
      <div className='mt-2 grid grid-cols-1 gap-4 md:grid-cols-3'>
        {recipes.map(r => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  )
}

export default MoreFromAuthor