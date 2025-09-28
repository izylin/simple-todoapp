import { create } from 'zustand';
import { ITask } from '@/types/tasks';

interface TodoStore {
  tasks: ITask[];
  addTask: (task: ITask) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  tasks: [],
  
  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task]
  })),
}));
