import { Check, Trash } from "phosphor-react";

import styles from './Task.module.css';

interface TaskProps {
  id: string;
  name: string;
  isComplete: boolean;
  handleCompleteTask: (id: string) => void;
  handleDeleteTask: (id: string) => void;
}
export function Task({ id, name, isComplete, handleCompleteTask, handleDeleteTask }: TaskProps) {


  return (
    <div className={styles.task}>
      <button onClick={() => handleCompleteTask(id)} className={isComplete ? styles.checked : styles.check}>
        {isComplete && <Check size={15} />}
      </button>
      <p className={isComplete ? styles.done : ''}>{name}</p>
      <button onClick={() => handleDeleteTask(id)} className={styles.trash}>
        <Trash size={24} />
      </button>
    </div>
  );
}