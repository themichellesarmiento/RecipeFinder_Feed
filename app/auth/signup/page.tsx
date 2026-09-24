'use client'

import Link from "next/link";
import { SignUp as SignUpAction } from "@/actions/signup-action"
import { signUpSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signUpSchema)

  })

  const { mutate, error: serverSideError, isPending } = useMutation({
    mutationFn: SignUpAction,
    onSuccess: () => router.push('/')
  })

  return (
    <div className='max-w-md mx-auto px-4'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit((values) => mutate(values))}>
        <h2 className='text-lg font-medium text-center p-2 uppercase'>Sign Up</h2>
        {serverSideError && <ErrorMessage error={serverSideError.message} />}
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm font-medium uppercase'>Username</label>
          <input {...register('username')} placeholder='Enter username here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.username && <ErrorMessage error={errors.username.message!} />}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='text-sm font-medium uppercase'>Email</label>
          <input {...register('email')} type='email' placeholder='Enter your email here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-medium uppercase'>Password</label>
          <input {...register('password')} type='password' placeholder='Enter your password here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.password && <ErrorMessage error={errors.password.message!} />}
        </div>
        <button type='submit' disabled={isPending} className='bg-accent-one rounded text-white p-4'>{isPending ? 'Signing up..' : 'Sign Up'}</button>
        <Link href='/auth/login'>Already have an account? Log in here</Link>
      </form>
    </div>
  )
}

export default SignUp;