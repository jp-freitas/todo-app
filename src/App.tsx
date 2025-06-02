import { Header } from "./components/Header";
import styles from "./App.module.css";
import "./global.css";
import { NewTask } from "./components/NewTask";

export function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerTable}>
        <NewTask />
      </div>
    </div>
  )
}
