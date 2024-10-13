import { ChangeEvent, InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ label, onChange, ...rest }: InputProps) {
  return (
    <div className="w-full flex items-center justify-center flex-col hover:opacity-85">
      {label && (
        <label
          className="w-full text-neutral-300 font-semibold"
          htmlFor={rest.name}
        >
          {label}
        </label>
      )}
      <input
        className="w-full px-2 py-3 flex items-start justify-center bg-neutral-500 text-neutral-900 font-semibold placeholder:text-neutral-700 rounded-md"
        {...rest}
        onChange={onChange}
      />
    </div>
  )
}
