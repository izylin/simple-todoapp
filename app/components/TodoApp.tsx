"use client";

import { useEffect } from "react";
import { useTodoStore } from "@/lib/store";
import { ITask } from "@/types/tasks";
import AddTask from "./AddTask";
import TodoList from "./TodoList";

interface TodoAppProps {
  initialTasks: ITask[];
}

const TodoApp: React.FC<TodoAppProps> = ({ initialTasks }) => {
  const { setTasks, tasks } = useTodoStore();

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks, setTasks]);

  return (
    <div className='max-w-4xl mx-auto pt-8 px-4'>
      <div className='text-center my-5 flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </div>
  );
};

export default TodoApp;
