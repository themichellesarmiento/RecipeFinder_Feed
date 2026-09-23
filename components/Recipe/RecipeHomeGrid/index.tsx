'use client'

import { useQuery } from "@tanstack/react-query"
import { AllRecipesType, getAllRecipes } from "@/lib/supabase/queries";
import RecipeCard from "../RecipeCard";
import { createClient } from "@/lib/supabase/browserClient";

const RecipeHomeGrid = ({ recipes }: { recipes: AllRecipesType }) => {
  const supabase = createClient()
  const { data: recipesData , isError ,error } = useQuery({
    queryKey: ['home-recipes'],
    queryFn: async () => {
      const { data, error } = await getAllRecipes(supabase)
      if (error) throw new Error(error.message)
      return data
    },
    initialData: recipes
  })

  if (isError) {
    return (
      <p className='mt-4 text-accent-two'>
        Something went wrong: {error.message}
      </p>
    )
  }

  if (!recipesData || recipesData.length === 0) {
    return (
      <p className='mt-4 text-text-primary/70'>
        No recipes available
      </p>
    )
  }

  return (
    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
      {recipesData.map((p, index) => (
        <RecipeCard recipe={p} key={index} />
      ))}
    </div>
  )
}

export default RecipeHomeGrid;