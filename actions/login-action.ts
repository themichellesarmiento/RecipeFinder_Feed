'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { logInSchema } from "./schemas"
import { z } from 'zod'

export const LogIn = async (userdata: z.infer<typeof logInSchema>) => {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: userdata.email,
    password: userdata.password,
  })
  if (error) throw error

  return { success: true }
}