import { TaskType } from '../@types/task';
import { Task } from './Task';
import styles from './TasksTable.module.css';
import { WithoutTasks } from './WithoutTasks';
import React, { useRef } from 'react';

interface TasksTableProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export function TasksTable({ tasks, setTasks }: TasksTableProps) {
  const completedTasks = tasks.filter(task => task.isComplete === true);
  const classTasksList = tasks.length <= 3 ? styles.noScroll : styles.tasksList;
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  function handleCompleteTask(id: string) {
    const completeTask = tasks.map(
      task => task.id === id ? {
        ...task,
        isComplete: !task.isComplete,
      } : task);
    setTasks(completeTask);
  }

  function handleDeleteTask(id: string) {
    const findTask = tasks.findIndex(task => task.id === id);
    tasks.splice(findTask, 1);
    setTasks([...tasks]);
  }

  function handleDragStart(index: number) {
    dragItem.current = index;
  }

  function handleDragEnter(index: number) {
    dragOverItem.current = index;
  }

  function handleDragEnd() {
    const copyTasks = [...tasks];
    const dragItemContent = copyTasks[dragItem.current!];
    copyTasks.splice(dragItem.current!, 1);
    copyTasks.splice(dragOverItem.current!, 0, dragItemContent);
    setTasks(copyTasks);
    dragItem.current = null;
    dragOverItem.current = null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.tasks}>Tarefas criadas <span>{tasks.length}</span></p>
        <p className={styles.completedTasks}>Concluídas <span>{tasks.length >= 1 ? `${completedTasks.length} de ${tasks.length}` : `${tasks.length}`}</span></p>
      </div>
      {
        tasks.length === 0 ?
          <WithoutTasks />
          :
          <div className={classTasksList}>
            {
              tasks.map((task, i) => (
                <div
                  key={task.id}
                  id='div_task'
                  draggable
                  onDragStart={() => handleDragStart(i)}
                  onDragEnter={() => handleDragEnter(i)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => e.preventDefault()}
                  className={styles.taskItem}
                >
                  <Task
                    id={task.id}
                    name={task.name}
                    isComplete={task.isComplete}
                    handleCompleteTask={handleCompleteTask}
                    handleDeleteTask={handleDeleteTask}
                  />
                </div>
              ))
            }
          </div>
      }
    </div>
  );
}