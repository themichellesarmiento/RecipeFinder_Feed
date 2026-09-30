'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { signUpSchema } from "./schemas"
import { z } from 'zod'
import { CreateAdminClient } from "@/lib/supabase/adminClient"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.signUp(userdata)

  if (error) throw error

  if (user && user.email) {
    const { error: insertError } = await supabase.from('users').insert({ id: user.id, email_address: user.email, username: userdata.username })
    if (insertError) {

      const adminClient = CreateAdminClient()
      await adminClient.auth.admin.deleteUser(user.id)
      throw new Error(insertError.message)
    }
  }

  return { success: true }

}