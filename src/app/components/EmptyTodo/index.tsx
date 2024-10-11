import { ClipboardText } from 'phosphor-react'

export default function EmptyTodo() {
  return (
    <div className="w-full h-full mt-6 py-24 px-4 flex flex-col items-center justify-center border-t-2 border-t-neutral-500 text-neutral-600">
      <ClipboardText size={64} />
      <p className="mt-4 font-bold">You do not have any todos created.</p>
      <p className="mt-1 font-normal">
        Create todos and organize your todo items.
      </p>
    </div>
  )
}
