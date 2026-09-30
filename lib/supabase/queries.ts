import { type QueryData, createClient } from '@supabase/supabase-js'

export const getAllRecipes = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select('id, title, slug, author("id","username"),category("name")')
    .order('created_at', { ascending: false })
}

export const getSingleRecipe = async (slug: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select('id,title,ingredients,instructions,slug, author("id","username"),category("name" ,"id")')
    .eq("slug", slug)
    .single()
}

export const searchRecipe = async (searchTerm: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select('id, title, slug, author("id","username"),category("name")')
    .ilike('title', `%${searchTerm}%`)
}

export const getRecipesByCategory = async (categoryName: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select('id, title, slug, author("id","username"),category:categories!inner("name")')
    .eq('categories.name', categoryName)
}

export const getCategories = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from('categories')
    .select('id, name')
    .order('name');
};

export type AllRecipesType = QueryData<ReturnType<typeof getAllRecipes>>
export type SingleRecipeType = QueryData<ReturnType<typeof getSingleRecipe>>
export type SearchResultType = QueryData<ReturnType<typeof searchRecipe>>
export type RecipesByCategory = QueryData<ReturnType<typeof getRecipesByCategory>>