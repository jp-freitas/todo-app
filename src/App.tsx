import { Header } from "./components/Header";
import styles from './App.module.css';
import "./global.css";
import { NewTask } from "./components/NewTask";
import { TasksTable } from "./components/TasksTable";

export function App() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <NewTask />
      </div>
    </div>
  )
}
