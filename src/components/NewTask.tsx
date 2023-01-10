import { PlusCircle } from 'phosphor-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../@types/task';

import styles from './NewTask.module.css'
import { TasksTable } from './TasksTable';

export function NewTask() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storagedTask = localStorage.getItem('@todo:task-1.0.0')
    if (storagedTask) {
      return JSON.parse(storagedTask)
    }
    return [];
  });
  const [newTask, setNewTask] = useState('');
  const isNewTaskEmpty = newTask.length === 0;
  const updatedTasks = [...tasks]

  useEffect(() => {
    const stateJSON = JSON.stringify(tasks)
    localStorage.setItem('@todo:task-1.0.0', stateJSON)
  }, [tasks])

  function handleChangeNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    const task: TaskType = {
      id: uuidv4(),
      name: newTask,
      isComplete: false,
    }
    updatedTasks.unshift(task)
    setTasks(updatedTasks);
    setNewTask("");
    localStorage.setItem(
      '@todo:task-1.0.0',
      JSON.stringify(updatedTasks),
    )
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