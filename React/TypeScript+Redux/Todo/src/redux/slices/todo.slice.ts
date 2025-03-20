import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../types/todo.type";

const initialState: Todo = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        task: action.payload,
        completed: false,
      });
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
