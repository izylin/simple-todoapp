import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();

  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='max-w-4xl mx-auto pt-8 px-4'>
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Todo List App</h1>
          <AddTask />
        </div>
        <TodoList tasks={tasks} />
      </div>
    </main>
  );
}
