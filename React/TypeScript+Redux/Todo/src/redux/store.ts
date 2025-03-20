import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./slices/todo.slice";

const RootReducer = {
  todo: TodoReducer,
};

export const store = configureStore({
  reducer: RootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
