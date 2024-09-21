'use client'
import { supabase } from "@/lib/supabase";
//import { Todo } from "@/types/todo";

export default function Home() {
  async function createTodo() {
    const {data, error} = await supabase
      .from('todo')
      .insert([
        {
          task: 'Teste'
        }
      ])
      .select();
    if (error) { console.error(error)
    } else { console.log(data)};
  }
  
  return (
    <div className="min-h-screen flex justify-center items-center">
      <button onClick={() => createTodo()} className="white-text hover:border-white h-2 border-2 border-neutral-950 py-6 px-8 flex justify-center items-center rounded-md">Create</button>
    </div>
  );
}
