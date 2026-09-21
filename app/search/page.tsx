import { searchRecipe } from '@/lib/supabase/queries';
import SearchResults from '@/components/SearchResults';

interface SearchPageProps {
  searchParams: { q: string | undefined };
}

const Search = async ({ searchParams }: SearchPageProps) => {
  const { q } = await searchParams;
  const query = q ?? '';
  const { data: recipes } = query ? await searchRecipe(query) : { data: [] };

  return (
    <div className='mx-auto max-w-6xl px-4 py-6'>
      <h1 className='text-2xl md:text-3xl'>
        {query ? `Results for '${query}'` : 'Search recipes'}
      </h1>
      <SearchResults query={query} initialData={recipes ?? []}/>
    </div>
  );
};

export default Search;