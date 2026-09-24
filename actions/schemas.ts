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