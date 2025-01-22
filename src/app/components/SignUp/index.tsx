'use client'

import { useRouter } from 'next/navigation'
import { z } from 'zod'
import Input from '../Input'
import Button from '../Button'
import { signUpSchema } from '@/lib/authSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

type SignInFormData = z.infer<typeof signUpSchema>

export default function SignUp() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signUpSchema),
  })

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true)
    const { email, password, name } = data
    if (data.email && data.password && data.name) {
      signUp(email, password, name)
      setIsLoading(false)
      router.push('/')
    }
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center p-10 rounded-md bg-neutral-700">
        <h1 className="text-neutral-300 text-3xl font-semibold mx-4">
          Sign Up
        </h1>
        <p className="text-neutral-400 text-base font-normal mt-2">
          Please enter your credentials to sign in up the application
        </p>
        <form
          className="w-full flex justify-center gap-3 flex-col m-4"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <Input
            label="Name"
            type="text"
            placeholder="Type your name here."
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-600 text-xs -mt-2">{errors.name.message}</p>
          )}
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
          <Input
            label="Confirmation Password"
            type="password"
            placeholder="Type your confirmation password here."
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs -mt-2">
              {errors.confirmPassword.message}
            </p>
          )}
          <div className="w-full flex items-center justify-end flex-row mt-6 gap-4 mx-4">
            <Button text="Sign up" type="submit" disabled={isLoading} />
          </div>
        </form>
      </div>
    </main>
  )
}
