'use client'
import { supabase } from '@/lib/supabase'
import { TodoType } from '@/types/todo'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Todo } from '@/app/components/Todo'

export default function Home() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState<TodoType[]>([])
  const completedTodos = todos.filter((todo) => todo.is_complete === true)

  useEffect(() => {
    getData()
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value)
  }

  async function getData() {
    const { data, error } = await supabase
      .from('todo')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error(error)
    } else {
      setTodos(data)
    }
  }

  async function createTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!todo) {
      console.log('The input of the task is empty')
      return
    }

    const { data, error } = await supabase
      .from('todo')
      .insert([
        {
          task: todo,
        },
      ])
      .select()
      .single()
    if (error) {
      console.error(error)
    } else {
      setTodos((prev) => [...prev, data])
      setTodo('')
    }
  }

  async function handleCompleteTodo(id: string, isComplete: boolean) {
    console.log(todos)
    const { data, error } = await supabase
      .from('todo')
      .update({
        is_complete: !isComplete,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single()
    if (error) {
      console.error(error)
    } else {
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)))
    }
  }

  async function handleDeleteTodo(id: string) {
    const findedTodo = todos.find((todo: TodoType) => todo.id === id)

    if (!findedTodo) {
      throw new Error('Todo not found')
    }

    const { error } = await supabase.from('todo').delete().eq('id', id)
    if (error) {
      console.error(error)
    } else {
      setTodos(todos.filter((todo) => todo.id !== id))
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full h-[12.5rem] flex items-center justify-center flex-row bg-neutral-800 z-10">
        <h1 className="font-bold text-[250%] text-neutral-950">
          to
          <span className="text-neutral-100">do</span>
        </h1>
      </div>
      <div className="w-7/12 h-1/4 -m-7 z-10">
        <form
          onSubmit={createTodo}
          className="flex justify-between items-center gap-2"
        >
          <input
            name="todo"
            type="text"
            placeholder="Enter your task here"
            className="h-2 py-6 w-full px-2 white-text bg-neutral-700 border-2 border-neutral-700 hover:border-neutral-500 rounded-md"
            onChange={handleChange}
            value={todo}
          />
          <button
            className={`white-text h-2 py-6 px-8 flex justify-evenly items-center rounded-md bg-neutral-700 ${todo === '' ? 'cursor-not-allowed border-2 border-neutral-700 opacity-75' : 'hover:border-neutral-500 border-2 border-neutral-700'}`}
            disabled={todo === ''}
          >
            Create
            <PlusCircle size={24} className="ml-2" />
          </button>
        </form>
      </div>
      <div className="w-7/12 h-3/4 flex flex-col items-start -mt-20 z-10">
        <div className="w-full flex flex-row items-center justify-between mb-6">
          <p className="flex items-center justify-center text-neutral-100 font-medium">
            {`${todos.length > 1 ? 'Todos created' : 'Todo created'}`}
            <span className="text-neutral-950 bg-neutral-600 font-bold text-xs py-0.5 px-2 rounded-2xl ml-1">
              {todos.length}
            </span>
          </p>
          <p className="">
            Completed{' '}
            <span className="text-neutral-950 bg-neutral-600 font-bold text-xs py-0.5 px-2 rounded-2xl ml-1">
              {todos.length >= 1
                ? `${completedTodos.length} of ${todos.length}`
                : `${todos.length}`}
            </span>
          </p>
        </div>
        {todos.length === 0 ? (
          <div className="w-full h-full mt-6 py-24 px-4 flex flex-col items-center justify-center border-t-2 border-t-neutral-500 text-neutral-600">
            <ClipboardText size={64} />
            <p className="mt-4 font-bold">You do not have any todos created.</p>
            <p className="mt-1 font-normal">
              Create todos and organize your todo items.
            </p>
          </div>
        ) : (
          todos.map((todo) => {
            return (
              <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                isComplete={todo.is_complete}
                handleCompleteTodo={() =>
                  handleCompleteTodo(todo.id, todo.is_complete)
                }
                handleDeleteTodo={() => handleDeleteTodo(todo.id)}
              />
            )
          })
        )}
      </div>
    </div>
  )
}
