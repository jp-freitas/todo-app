'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import Input from '../Input'
import Button from '../Button'
import { signInSchema } from '@/lib/authSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type SignInFormData = z.infer<typeof signInSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })
  const router = useRouter()

  function onSubmit(data: SignInFormData) {
    console.log(data)
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center p-10 rounded-md bg-neutral-700">
        <h1 className="text-neutral-300 text-3xl font-semibold mx-4">
          Sign In
        </h1>
        <p className="text-neutral-400 text-base font-normal mt-2">
          Please enter your credentials to sign in in the application
        </p>
        <form
          className="w-full flex justify-center gap-3 flex-col m-4"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input
            label="E-mail"
            type="email"
            placeholder="Type your email here."
            {...register('email')}
          />
          {errors.email && (
            <p className="text-red-600 text-xs -mt-2">{errors.email.message}</p>
          )}
          <Input
            label="Password"
            type="password"
            placeholder="Type your password here."
            {...register('password')}
          />
          {errors.password && (
            <p className="text-red-600 text-xs -mt-2">
              {errors.password.message}
            </p>
          )}
          <a
            className="w-full flex items-center justify-center text-neutral-900 font-semibold mx-4 hover:opacity-75"
            href=""
          >
            Forgot your password?
          </a>
          <p className="w-full flex items-center justify-center font-semibold text-neutral-400 mx-4 gap-1">
            Doesn&apos;t have an account?{' '}
            <a className="text-neutral-900 hover:opacity-75" href="">
              Sign Up
            </a>
          </p>
          <div className="w-full flex items-center justify-end flex-row mt-6 gap-4 mx-4">
            <Button
              text="Back"
              type="button"
              onClick={() => router.push('/')}
            />
            <Button text="Sign in" type="submit" />
          </div>
        </form>
      </div>
    </main>
  )
}
