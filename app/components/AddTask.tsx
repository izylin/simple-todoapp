"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { useState } from "react";
import { addTodo } from "@/api";
import { useTodoStore } from "@/lib/store";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import type { ITask } from "@/types/tasks";

const AddTask = () => {
  const addTask = useTodoStore((state) => state.addTask);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  type AddTaskFormValues = {
    text: string;
    description: string;
  };

  const form = useForm<AddTaskFormValues>({
    defaultValues: {
      text: "",
      description: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: AddTaskFormValues) => {
    const payload: ITask = {
      id: uuidv4(),
      text: values.text,
      description: values.description,
    };
    await addTodo(payload);
    addTask(payload);
    form.reset();
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        className='w-full'
      >
        Add new task <AiOutlinePlus className='ml-2' size={18} />
      </Button>

      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        className="rounded-2xl bg-white text-zinc-900 border-zinc-200 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_10px_30px_-10px_rgba(0,0,0,0.3)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-700"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <h3 className='font-bold text-lg'>Add new task</h3>
            <FormField
              control={form.control}
              name='text'
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g. Buy groceries' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Optional details...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='modal-action'>
              <Button type='submit'>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTask;
