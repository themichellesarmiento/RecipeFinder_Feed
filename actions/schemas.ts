import { z } from 'zod'

export const logInSchema = z.object({
  email: z.email('Incorrect email pattern'),
  password: z.string().min(6, 'Passwords must be 6 characters')
})

export const signUpSchema = z.object({
  email: z.email('Incorrect email pattern'),
  password: z.string().min(6, 'Passwords must be 6 characters'),
  username: z.string().min(6, 'Needs at least 6 characters')
})

export const recipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  ingredients: z.string().min(5, 'List at least one ingredient'),
  instructions: z.string().min(5, 'Add at least one instruction step'),
  category: z.uuid('Please choose a category'),
  images: z.array(z.instanceof(File)).max(4, 'Up to 4 images are allowed').optional()
});

export const commentSchema = z.object({
  content: z.string().min(3, 'Comment is too short').max(1000, 'Comment is too long')
})

export type RecipeFormValues = z.infer<typeof recipeSchema>;
export type CommentFormValues = z.infer<typeof commentSchema>;