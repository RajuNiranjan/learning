import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './Actions/todo.action'

export const store = configureStore({
    reducer: {
        todo: TodoReducer
    }
})