import { RecipeImage } from '@/types/recipe'

interface RecipeImageGridProps {
  images: RecipeImage[]
  recipeTitle: string
}

const RecipeImageGrid = ({ images, recipeTitle }: RecipeImageGridProps) => {
  if (images.length === 0) {
    <div className='aspect-video overflow-hidden rounded-2xl'>
      {images[0] &&
        <img src={images[0].image_path} alt={recipeTitle} className='h-full w-full object-cover' />
      }
    </div>
  }

  if (images.length === 1) {
    return (
      <div className='aspect-video overflow-hidden rounded-2xl'>
        <img src={images[0].image_path} alt={recipeTitle} className='h-full w-full object-cover' />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className='grid grid-cols-2 gap-2 overflow-hidden rounded-2xl'>
        {images.map((img) => (
          <img key={img.id} src={img.image_path} alt={recipeTitle} className='aspect-square w-full object-cover' />
        ))}
      </div>
    )
  }

  if (images.length === 3) {
    return (
      <div className='grid aspect-video grid-cols-2 gap-2 overflow-hidden rounded-2xl'>
        <img src={images[0].image_path} alt={recipeTitle} className='row-span-2 h-full w-full object-cover' />
        <img src={images[1].image_path} alt={recipeTitle} className='h-full w-full object-cover' />
        <img src={images[2].image_path} alt={recipeTitle} className='h-full w-full object-cover' />
      </div>
    )
  }

  return (
    <div className='grid aspect-video grid-cols-2 grid-rows-2 gap-2 overflow-hidden rounded-2xl'>
      {images.map((img) => (
        <img key={img.id} src={img.image_path} alt={recipeTitle} className='h-full w-full object-cover' />
      ))}
    </div>
  )
}

export default RecipeImageGrid