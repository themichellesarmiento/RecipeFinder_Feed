'use client'

import Link from "next/link";
import ErrorMessage from "@/components/UI/ErrorMessage";
import { LogIn as LogInAction } from "@/actions/login-action";
import { logInSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const LogIn = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(logInSchema)
  })

  const { mutate, error: serverSideError, isPending } = useMutation({
    mutationFn: LogInAction,
    onSuccess: () => router.push('/')
  })

  return (
    <div className='max-w-md mx-auto px-4'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit((values) => mutate(values))}>
        <h2 className='text-lg font-medium text-center p-2 uppercase'>Log In</h2>
        {serverSideError && <ErrorMessage error={serverSideError.message} />}
        <div className='flex flex-col gap-1'>
          <label htmlFor='username' className='text-sm font-medium uppercase'>Email</label>
          <input {...register('email')} placeholder='Enter username here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.email && <ErrorMessage error={errors.email.message!} />}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='text-sm font-medium uppercase'>Password</label>
          <input {...register('password')} type='password' placeholder='Enter your password here' className='border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent-one' />
          {errors.password && <ErrorMessage error={errors.password.message!} />}
        </div>
        <button type='submit' disabled={isPending} className='bg-accent-one rounded text-white p-4'>{isPending ? 'Logging in..' : 'Log In'}</button>
        <Link href='/auth/signup'>Don't have an account? Sign up here</Link>
      </form>
    </div>
  )
}

export default LogIn;