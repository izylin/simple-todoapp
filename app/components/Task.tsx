"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";
import { useTodoStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TableRow } from "@/components/ui/table";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const { deleteTask, editTask } = useTodoStore();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const [descriptionToEdit, setDescriptionToEdit] = useState<string>(task.description);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = await editTodo({
        id: task.id,
        text: taskToEdit,
        description: descriptionToEdit,
      });
      editTask(updatedTask);
      setOpenModalEdit(false);
    } catch (error) {
      console.error('Failed to edit task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      deleteTask(id);
      setOpenModalDeleted(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <TableRow key={task.id}>
      <td className='w-full'>
        <div className='flex flex-col gap-1'>
          <span>{task.text}</span>
          {task.description && (
            <span className='text-sm text-muted-foreground'>{task.description}</span>
          )}
        </div>
      </td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal
          modalOpen={openModalEdit}
          setModalOpen={setOpenModalEdit}
          className="rounded-2xl bg-white text-zinc-900 border-zinc-200 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700"
        >
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div className='flex w-full flex-col gap-3'>
              <Input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder='Title'
                className='w-full'
              />
              <Textarea
                value={descriptionToEdit}
                onChange={(e) => setDescriptionToEdit(e.target.value)}
                placeholder='Optional description'
              />
            </div>
            <div className='modal-action'>
              <Button type='submit'>
                Submit
              </Button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal
          modalOpen={openModalDeleted}
          setModalOpen={setOpenModalDeleted}
          className="rounded-2xl bg-white text-zinc-900 border-zinc-200 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700"
        >
          <h3 className='text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <Button onClick={() => handleDeleteTask(task.id)}>
              Yes
            </Button>
          </div>
        </Modal>
      </td>
    </TableRow>
  );
};

export default Task;
