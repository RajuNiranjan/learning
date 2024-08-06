import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './Actions/todoSlice.action'

export const store = configureStore({
    reducer: {
        todo: TodoReducer
    }
})