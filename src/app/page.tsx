'use client'
import { supabase } from "@/lib/supabase";
import { Todo } from "@/types/todo";
import { ChangeEvent, useEffect, useState } from "react";
//import { Todo } from "@/types/todo";

export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  
  useEffect(() => {
    async function getData() {
      const { data, error } = await supabase
        .from('todo')
        .select('*');
      if (error) {
        console.error(error)
      } else {
        setTodos(data);
      }
    }

    getData();
  }, [todos]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value);
  }

  async function createTodo() {
    if(!todo) {
      console.log("The input of the task is empty");
      return;
    }  

    const {data, error} = await supabase
      .from('todo')
      .insert([
        {
          task: todo
        }
      ])
      .select();
    if (error) { 
      console.error(error)
    } else { 
      console.log(data)
    };
    setTodo("");    
  };
  
  return (
    <div className="w-9/12 h-screen flex flex-col">
      <div className="w-full h-1/4 flex justify-between items-center gap-2">
        <input 
          name="todo"
          type="text"
          placeholder="Enter your task here"
          className="h-2 py-6 w-full px-2 white-text bg-neutral-700 border-2 border-neutral-700 hover:border-white rounded-md"
          onChange={handleChange}
          value={todo}
        />
        <button 
          onClick={() => createTodo()}
          className={`white-text h-2 py-6 px-8 flex justify-center items-center rounded-md bg-neutral-700 ${todo === "" ? "cursor-not-alowed border-2 border-neutral-700 opacity-75" : "hover:border-white border-2 border-neutral-700"}`}
          disabled={todo === ""}
        >
          Create
        </button>
      </div>
      <div className="h-3/4 flex flex-col items-start">
        {
          todos.map((todo) => {
            return (
              <div key={todo.id} className="w-full flex flex-row items-center gap-4">
                <p>{todo.id}</p>
                <p>{todo.task}</p>
                <p>{`${todo.is_complete ? true : false}`}</p>
                <p>{todo.created_at}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
