import { create } from 'zustand';
import { ITask } from '@/types/tasks';

interface TodoStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  deleteTask: (id: string) => void;
  editTask: (task: ITask) => void;
  setTasks: (tasks: ITask[]) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task]
  })),
  
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),
  
  editTask: (updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    )
  })),
  
  setTasks: (tasks) => set({ tasks }),
}));
