import { create } from "zustand";

export const useTodoStore = create((set) => ({
  todos: [],
  addTask: (task) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), task, completed: false }],
    })),
  toggleTask: (id) =>
    set((state) => ({
      todos: state.todos.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      todos: state.todos.filter((task) => task.id !== id),
    })),
}));
