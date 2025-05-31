import { forwardRef, InputHTMLAttributes, Ref } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

function Input({ label, ...rest }: InputProps, ref: Ref<HTMLInputElement>) {
  return (
    <div className="w-full flex items-center justify-center flex-col hover:opacity-85">
      {label && (
        <label
          className="w-full text-slate-300 font-semibold"
          htmlFor={rest.name}
        >
          {label}
        </label>
      )}
      <input
        className="w-full px-2 py-3 flex items-start justify-center bg-slate-500 text-slate-900 font-semibold placeholder:text-slate-700 rounded-md"
        {...rest}
        ref={ref}
      />
    </div>
  )
}

export default forwardRef(Input)
