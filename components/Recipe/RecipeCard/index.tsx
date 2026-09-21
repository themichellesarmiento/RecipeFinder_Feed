import { RecipePropsType } from "@/types/recipe";
import Link from "next/link"

const RecipeCard = ({ recipe }: { recipe: RecipePropsType }) => {
  return (
    <div className='relative flex flex-col overflow-hidden rounded-2xl border border-text-primary/10 transition-all duration-200 hover:-translate-y-1 hover:border-text-primary/25'>
      <Link href={`/recipe/${recipe.slug}`} className='absolute inset-0 z-0'/>
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/category/${encodeURIComponent(recipe.category.name)}`} className='relative z-10 inline-block rounded-full px-3 py-1 text-sm font-medium text-accent-three/90'>{recipe.category.name}</Link>
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-xl">{recipe.title}</h3>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-text-primary text-xs font-medium text-background">
            {recipe.author.username.charAt(0).toUpperCase()}
          </span>
          <span className="text-sm text-text-primary/70">{recipe.author.username}</span>
        </div>
      </div>
    </div>
  )
}

export default RecipeCard;