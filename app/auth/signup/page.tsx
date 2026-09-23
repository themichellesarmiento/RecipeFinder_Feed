'use client'

import Link from "next/link";
import { useActionState } from "react";
import { SignUp as SignUpAction } from "@/actions/signup-action";
import { SignUpState } from "@/types/signupState";

const initialState: SignUpState = { error: null }

const SignUp = () => {
  const [state, formAction, isPending] = useActionState(SignUpAction, initialState)

  return (
    <div className='max-w-md mx-auto px-4'>
      <form className='flex flex-col gap-4' action={formAction}>
        <h2 className='text-lg font-medium text-center p-2 uppercase'>Sign Up</h2>
        {state.error && (
          <p className="text-accent-two text-sm text-center mb-2">
            {state.error}
          </p>
        )}
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm font-medium uppercase'>Username</label>
          <input name='username' placeholder='Enter username here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-medium uppercase'>Email</label>
          <input name='email' type='email' placeholder='Enter your email here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-medium uppercase'>Password</label>
          <input name='password' type='password' placeholder='Enter your password here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
        </div>
        <button type='submit' disabled={isPending} className='bg-accent-one rounded text-white p-4'>{isPending ? 'Signing up..' : 'Sign Up'}</button>
        <Link href='/auth/login'>Already have an account? Log in here</Link>
      </form>
    </div>
  )
}

export default SignUp;