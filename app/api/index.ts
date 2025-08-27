import { ITask } from "@/types/tasks";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "todos.json");

// Helper function to read todos from file
const readTodos = (): ITask[] => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData.tasks || [];
  } catch (error) {
    console.error("Error reading todos:", error);
    return [];
  }
};

// Helper function to write todos to file
const writeTodos = (todos: ITask[]): void => {
  try {
    const data = { tasks: todos };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing todos:", error);
  }
};

export const addTodo = async (todo: ITask): Promise<void> => {
  const todos = readTodos();
  todos.push(todo);
  writeTodos(todos);
};

export const getAllTodos = async (): Promise<ITask[]> => {
  return readTodos();
};

export const deleteTodo = async (id: string): Promise<void> => {
  const todos = readTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  writeTodos(filteredTodos);
};

export const editTodo = async (id: string, text: string): Promise<void> => {
  const todos = readTodos();
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex].text = text;
    writeTodos(todos);
  }
};

