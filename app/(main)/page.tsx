import RecipeHomeGrid from "@/components/Recipe/RecipeHomeGrid";
import { getAllRecipes } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const Home = async () => {
  const supabase = await createClient()
  const { data: allRecipes } = await getAllRecipes(supabase)

  return (
    <div className='max-w-6xl px-4 py-8 md:py-14 mx-auto'>
      <div className='mb-6'>
        <h1 className='text-2xl md:text:3xl'>What's cooking today</h1>
        <p className='mt-2 text-text-primary/80'>Recipes shared by home cooks, ready to try tonight</p>
      </div>
      {allRecipes && <RecipeHomeGrid recipes={allRecipes} />}
    </div>
  )
}

export default Home;