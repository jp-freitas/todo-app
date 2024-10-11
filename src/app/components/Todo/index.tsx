import { Check, Trash } from 'phosphor-react'

interface TodoProps {
  id: string
  task: string
  isComplete: boolean
  handleCompleteTodo: (id: string, is_complete: boolean) => void
  handleDeleteTodo: (id: string) => void
}

export function Todo({
  id,
  task,
  isComplete,
  handleCompleteTodo,
  handleDeleteTodo,
}: TodoProps) {
  return (
    <div
      key={id}
      className="w-full flex flex-row justify-between items-center p-4 my-2 mx-auto rounded-md border-2 border-neutral-600 bg-neutral-700"
    >
      <button
        className={`${isComplete ? 'mr-4 p-1 bg-neutral-950 border-2 border-neutral-950 text-neutral-500 rounded-full flex items-center justify-center hover:border-neutral-500' : 'mr-4 p-2.5 bg-transparent border-2 border-neutral-500 rounded-full hover:border-neutral-500'} border-neutral-500`}
        onClick={() => handleCompleteTodo(id, isComplete)}
      >
        {isComplete && <Check size={16} weight="bold" />}
      </button>
      <p
        className={`w-full ${isComplete ? 'line-through text-neutral-500' : ''}`}
      >
        {task}
      </p>
      <button
        onClick={() => handleDeleteTodo(id)}
        className="ml-4 bg-transparent text-neutral-500 b-0 hover:text-red-700"
      >
        <Trash size={24} />
      </button>
    </div>
  )
}
