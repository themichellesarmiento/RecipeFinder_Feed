import { type QueryData } from '@supabase/supabase-js'
import { createClient } from './browserClient'

export const getAllRecipes = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select(`id, title, slug, author:users(id, username),category:categories(id, name),images:recipe_images(image_path, position)`)
    .eq('images.position', 1)
    .order('created_at', { ascending: false })
}

export const getSingleRecipe = async (slug: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select(`*, author:users(id, username),category:categories(name, id),images:recipe_images(id, image_path, position)`)
    .eq("slug", slug)
    .order('position', { referencedTable: 'recipe_images', ascending: true })
    .single()
}

export const searchRecipe = async (searchTerm: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select(`id, title, slug, author:users(id, username),category:categories(id, name),images:recipe_images(image_path, position)`)
    .ilike('title', `%${searchTerm}%`)
}

export const getRecipesByCategory = async (categoryName: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from("recipes")
    .select(`id, title, slug, author:users(id, username),category:categories!inner("name"),images:recipe_images(id, image_path, position)`)
    .eq('categories.name', categoryName)
    .order('created_at', { ascending: false })
}

export const getCategories = async (supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from('categories')
    .select('id, name')
    .order('name');
};

export const getMoreFromAuthor = async (authorId: string, currentRecipeId: string, supabase: ReturnType<typeof createClient>) => {
  return await supabase
    .from('recipes')
    .select(`id,title,slug,author:users(id, username),category:categories(id, name),images:recipe_images(image_path,position)`)
    .eq('author', authorId)
    .neq('id', currentRecipeId)
    .eq('images.position', 1)
    .order('created_at', { ascending: false })
    .limit(3)
}

export type AllRecipesType = QueryData<ReturnType<typeof getAllRecipes>>
export type SingleRecipeType = QueryData<ReturnType<typeof getSingleRecipe>>
export type SearchResultType = QueryData<ReturnType<typeof searchRecipe>>
export type RecipesByCategory = QueryData<ReturnType<typeof getRecipesByCategory>>