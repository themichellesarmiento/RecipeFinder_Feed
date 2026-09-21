'use client'
import { searchRecipe, SearchResultType } from "@/lib/supabase/queries"
import { useQuery } from "@tanstack/react-query"
import RecipeCard from "../Recipe/RecipeCard"

interface SearchResultsProps {
  query: string,
  initialData: SearchResultType
}

const SearchResults = ({ query, initialData }: SearchResultsProps) => {
  const { data: results, isError, error } = useQuery({
    queryKey: ['search-results', query],
    queryFn: async () => {
      const { data, error } = await searchRecipe(query)
      if (error) throw new Error(error.message)
      return data
    },
    initialData,
    enabled: query.length > 0
  })

  if (isError) {
    return (
      <p className='mt-4 text-accent-two'>
        Something went wrong: {error.message}
      </p>
    )
  }

  if (!results || results.length === 0) {
    return (
      <p className='mt-4 text-text-primary/70'>
        {query ? `No recipes found matching '${query}'.` : 'Type something in the search bar to get started'}
      </p>
    )
  }

  return (
    <div className='mt-8 grid grid-cols-2 gap-4 md:grid-cols-3'>
      {results.map((p, index) => (
        <RecipeCard recipe={p} key={index} />
      ))}
    </div>
  )

}

export default SearchResults;