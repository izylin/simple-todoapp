import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className='overflow-x-auto'>
      <Table className='table w-full'>
        {/* head */}
        <thead>
          <TableRow>
            <TableHead>Tasks</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </thead>
        <TableBody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoList;
