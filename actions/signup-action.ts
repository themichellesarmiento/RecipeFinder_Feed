'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { signUpSchema } from "./schemas"
import { z } from 'zod'

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.signUp(userdata)

  if (error) throw error

  if (user && user.email) {
    const { error } = await supabase.from('users').insert({ id: user.id, email_address: user.email, username: userdata.username })
    if (error) throw error
  }

  return { success: true }

}