export interface RecipePropsType {
  id: string;
  title: string | null;
  slug: string | null;
  author: {
    id: string;
    username: string;
  };
  category: {
    name: string;
  };
}