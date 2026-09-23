'use server'

import { createClient } from "@/lib/supabase/serverClient"
import { SignUpState } from "@/types/signupState"

export const SignUp = async (_state: SignUpState, formdata: FormData): Promise<SignUpState> => {
  const supabase = await createClient()

  const userData = {
    email: formdata.get("email") as string,
    password: formdata.get("password") as string,
    options: {
      data: {
        username: formdata.get("username") as string,
      }
    }
  }
  const { error } = await supabase.auth.signUp(userData)
  if (error) {
    return { error: error.message }
  }
  return { error: null }

}