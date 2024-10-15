'use client'

import { FormEvent, useState } from 'react'

import Input from '../components/Input'
import Button from '../components/Button'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(email, password)
    setEmail('')
    setPassword('')
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
          className="w-full flex items-center justify-center gap-4 flex-col m-4"
          onSubmit={handleSubmit}
        >
          <Input
            label="E-mail"
            name="email"
            type="email"
            placeholder="your.email@email.com"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="********"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <a
            className="text-neutral-900 font-semibold mx-4 hover:opacity-75"
            href=""
          >
            Forgot your password?
          </a>
          <p className="font-semibold text-neutral-400 mx-4">
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
