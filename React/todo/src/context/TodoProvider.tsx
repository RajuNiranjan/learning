import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { TodoContext } from "./TodoContext";
import type { TodoType } from "../components/Todo";

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[] | []>([]);
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value);
  }

  function handleAddTask(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editId) {
      setTodos((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, task } : item))
      );

      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), checked: false, task }]);
    }

    setTask("");
  }

  function hanldeUpdateTask(id: number) {
    const current = todos.find((t) => t.id === id);
    if (current) {
      setTask(current.task);
      setEditId(id);
    }
  }

  function handleCheck(id: number) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  }

  function handleDeleteTask(id: number) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  const values = {
    todos,
    task,
    handleChangeInput,
    handleAddTask,
    handleCheck,
    handleDeleteTask,
    hanldeUpdateTask,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};
