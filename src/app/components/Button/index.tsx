import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string
}

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="text-neutral-400 font-semibold h-2 py-6 px-8 flex justify-evenly items-center rounded-md bg-neutral-800 hover:opacity-85"
    >
      {text}
    </button>
  )
}
