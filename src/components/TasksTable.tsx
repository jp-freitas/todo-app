import { TaskType } from '../@types/task';
import { Task } from './Task';
import styles from './TasksTable.module.css';
import { WithoutTasks } from './WithoutTasks';

interface TasksTableProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export function TasksTable({ tasks, setTasks }: TasksTableProps) {
  const completedTasks = tasks.filter(task => task.isComplete === true);
  const classTasksList = tasks.length < 2 ? styles.noScroll : styles.tasksList;

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
              tasks.map((task) => {
                return (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    isComplete={task.isComplete}
                    handleCompleteTask={handleCompleteTask}
                    handleDeleteTask={handleDeleteTask}
                  />
                )
              })
            }
          </div>
      }
    </div>
  );
}