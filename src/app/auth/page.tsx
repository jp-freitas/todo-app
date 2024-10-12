'use client'

import { FormEvent, useState } from 'react'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEmail('')
    setPassword('')
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8 rounded-md bg-neutral-700">
        <h1 className="text-neutral-300 text-3xl">Sign In</h1>
        <p className="text-neutral-400 text-base font-light mt-2">
          Please enter your credentials to sign in in the application
        </p>
        <form
          className="w-full flex items-center justify-center flex-col"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex items-center justify-center flex-col mt-6">
            <label
              className="w-full text-neutral-300 font-semibold"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="w-full px-2 py-3 bg-neutral-500 text-neutral-900 font-semibold placeholder:text-neutral-700 flex items-center rounded-md"
              name="email"
              value={email}
              placeholder="your.email@email.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex items-center justify-center flex-col mt-6">
            <label
              className="w-full text-neutral-300 font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-2 py-3 bg-neutral-500 text-neutral-900 font-semibold placeholder:text-neutral-700 flex items-center rounded-md"
              name="password"
              placeholder="***********"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a className="mt-6 text-neutral-900 font-semibold" href="">
              Forgot your password?
            </a>
            <p className="mt-2 font-semibold text-neutral-300">
              Doesn&apos;t have an account?{' '}
              <a className="text-neutral-900" href="">
                Sign Up
              </a>
            </p>
          </div>
          <div className="w-full flex items-center justify-between flex-row mt-6 gap-6">
            <button
              type="button"
              className="text-neutral-300 font-semibold h-2 py-6 px-6 w-full flex justify-evenly items-center rounded-md bg-neutral-500 hover:opacity-85"
            >
              Back
            </button>
            <button
              type="submit"
              className="text-neutral-300 font-semibold h-2 py-6 px-6 w-full flex justify-evenly items-center rounded-md bg-neutral-500 hover:opacity-85"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
