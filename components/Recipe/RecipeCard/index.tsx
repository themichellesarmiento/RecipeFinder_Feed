import { RecipePropsType } from '@/types/recipe';
import Link from 'next/link'

const RecipeCard = ({ recipe }: { recipe: RecipePropsType }) => {
  return (
    <div className='group relative flex flex-col rounded-2xl bg-light-bg shadow-sm shadow-text-primary/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-text-primary/15'>
      <div className='aspect-4/3 overflow-hidden rounded-xl bg-accent-three/10'>
        {recipe.images[0] &&
          <img src={recipe.images[0].image_path} alt={recipe.title} className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105' />}
      </div>
      <div className='flex flex-col gap-3 px-2 pb-2 pt-3 flex-1'>
        <Link href={`/category/${encodeURIComponent(recipe.category.name)}`} className='relative z-10 w-fit text-base font-medium uppercase text-accent-three transition-colors hover:text-accent-two'>{recipe.category.name}</Link>
        <h3 className='text-xl font-semibold text-text-primary transition-colors group-hover:text-accent-one'>
          {recipe.title}
        </h3>
        <div className='flex items-center gap-2 pt-2 mt-auto'>
          <span className='flex h-7 w-7 items-center justify-center rounded-full bg-accent-one/20 text-xs font-medium text-accent-one'>
            {recipe.author.username.charAt(0).toUpperCase()}
          </span>
          <span className='text-base md:text-lg text-text-primary/70'>{recipe.author.username}</span>
        </div>
      </div>
      <Link href={`/recipe/${recipe.slug}`} className='absolute inset-0 z-0' />
    </div>
  )
}

export default RecipeCard;