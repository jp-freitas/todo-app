import { ClipboardText } from "phosphor-react";
import styles from './WithoutTasks.module.css';

export function WithoutTasks() {
  return (
    <div className={styles.withoutTasks}>
      <ClipboardText size={64} />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}