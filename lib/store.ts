import { create } from 'zustand';
import { ITask } from '@/types/tasks';

const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
};

interface TodoStore {
  tasks: ITask[];
  addTask: (task: ITask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (task: ITask) => Promise<void>;
  setTasks: (tasks: ITask[]) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  
  addTask: async (task) => {
    try {
      const res = await fetch(`${baseUrl}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const createdTask: ITask = await res.json();
      set((state) => ({ tasks: [...state.tasks, createdTask] }));
    } catch (error) {
      console.error('Failed to add task:', error);
      throw error;
    }
  },
  
  deleteTask: async (id: string) => {
    try {
      await fetch(`${baseUrl}/tasks/${id}`, { method: 'DELETE' });
      set((state) => ({
        tasks: state.tasks.filter(task => task.id !== id)
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
      throw error; // Re-throw to allow component to handle the error
    }
  },
  
  editTask: async (updatedTask) => {
    try {
      const res = await fetch(`${baseUrl}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      const saved: ITask = await res.json();
      set((state) => ({
        tasks: state.tasks.map(task => task.id === saved.id ? saved : task)
      }));
    } catch (error) {
      console.error('Failed to edit task:', error);
      throw error;
    }
  },
  
  setTasks: (tasks) => set({ tasks }),
}));
