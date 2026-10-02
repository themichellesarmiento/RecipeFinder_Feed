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
  image:z.instanceof(FormData).optional()
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;