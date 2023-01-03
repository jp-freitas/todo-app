import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import styles from './NewTask.module.css'
import { TasksTable } from './TasksTable';

export type Tasks = {
  id: string;
  name: string;
  isComplete: boolean;
}

export function NewTask() {
  const [tasks, setTasks] = useState<Tasks[]>([
    {
      id: uuidv4(),
      name: 'Exemplo de tarefa',
      isComplete: true,
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const isNewTaskEmpty = newTask.length === 0;

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([{
      id: uuidv4(),
      name: newTask,
      isComplete: false,
    }, ...tasks,]);
    setNewTask("");
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleCreateNewTask}>
        <input type="text" name='newTask' value={newTask} onChange={handleChangeNewTask} placeholder="Adicione uma nova tarefa" />
        <button type='submit' disabled={isNewTaskEmpty}>
          Criar
          <PlusCircle size={24} />
        </button>
      </form>
      <TasksTable
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}