'use server'

import { createClient } from "@/lib/supabase/serverClient"

export const SignUp = async (formdata: FormData) => {
  const userData = {
    username: formdata.get("username") as string,
    email: formdata.get("email") as string,
    password: formdata.get("password") as string
  }
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.signUp(userData)

  if (error) throw error

}