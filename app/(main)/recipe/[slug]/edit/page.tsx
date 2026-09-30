import { getSingleRecipe } from "@/lib/supabase/queries";
import EditRecipeForm from "./editRecipeForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/serverClient";

const EditRecipe = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/auth/login');

  const { data: recipe, error } = await getSingleRecipe(slug, supabase)
  if (!recipe) throw error

  if (recipe.author.id !== user.id) redirect('/');

  return (
    <div className="mx-auto max-w-2xl p-6 md:p-10">
      {recipe &&
        <EditRecipeForm recipeId={recipe.id} defaultValues={{
          title: recipe.title,
          category: recipe.category.id,
          ingredients: recipe.ingredients,
          instructions: recipe.instructions
        }} />
      }
    </div>

  )
}

export default EditRecipe;