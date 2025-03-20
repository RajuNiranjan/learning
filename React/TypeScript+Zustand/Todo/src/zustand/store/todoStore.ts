import { create } from "zustand";
import { TodoState } from "../types/todo.type";

export const todoStore = create<TodoState>((set) => ({
  todos: [],
  addTask: (task: string) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), task, completed: false }],
    })),
  toggleTask: (id: number) =>
    set((state) => ({
      todos: state.todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((task) => task.id !== id),
    })),
}));
