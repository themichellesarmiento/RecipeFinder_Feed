import { getSingleRecipe } from "@/lib/supabase/queries";
import EditRecipeForm from "./editRecipeForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";

interface ParsedRecipe {
  ingredients: string;
  instructions: string;
}

function parseContentForEdit(content: string | null): ParsedRecipe {
  const [, ingredients = '', instructions = ''] =
    content!.match(/Ingredients:\s*([\s\S]*?)\s*Instructions:\s*([\s\S]*)/) ?? [];
  return { ingredients: ingredients.trim(), instructions: instructions.trim() };
}

const EditRecipe = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: recipe, error } = await getSingleRecipe(slug)
  if (!recipe) throw error

  if (recipe.author.id !== user.id) redirect('/');

  const { ingredients, instructions } = parseContentForEdit(recipe.content);

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-10">
      {recipe &&
        <EditRecipeForm recipeId={recipe.id} defaultValues={{
          title: recipe.title!,
          category: recipe.category.id,
          ingredients,
          instructions
        }} />
      }
    </div>

  )
}

export default EditRecipe;