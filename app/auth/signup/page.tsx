'use client'

import Link from "next/link";
import { useState } from "react";
import { SignUp as SignUpAction } from "@/actions/signup-action";

const SignUp = () => {
  const [formError, setFormError] = useState<string | null>(null)

  return (
    <div className='max-w-md mx-auto px-4'>
      <form className='flex flex-col gap-4'>
        <h2 className='text-lg font-medium text-center p-2 uppercase'>Sign Up</h2>
        {formError && (
          <p className="text-accent-two text-sm text-center mb-2">
            {formError}
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
        <button className='bg-accent-one rounded text-white p-4' formAction={SignUpAction}>Sign Up</button>
        <Link href='/auth/login'>Already have an account? Log in here</Link>
      </form>
    </div>
  )
}

export default SignUp;