import HeroSection from "@/components/HeroSection";
import RecipeHomeGrid from "@/components/Recipe/RecipeHomeGrid";
import { getAllRecipes } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/serverClient";

const Home = async () => {
  const supabase = await createClient()
  const { data: allRecipes } = await getAllRecipes(supabase)

  return (
    <>
      <HeroSection />
      {allRecipes && <RecipeHomeGrid recipes={allRecipes} />}
    </>
  )
}

export default Home;