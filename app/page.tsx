import { getAllTodos } from "@/api";
import TodoApp from "./components/TodoApp";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <TodoApp initialTasks={tasks} />
    </main>
  );
}
