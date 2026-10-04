export interface RecipePropsType {
  id: string;
  title: string;
  slug: string;
  author: {
    id: string;
    username: string;
  };
  images: {
    image_path: string
  }[]
  category: {
    name: string;
  };
}

export interface RecipeImage {
  id: string,
  image_path: string
}
