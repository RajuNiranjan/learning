import { configureStore } from '@reduxjs/toolkit'
import TodoReducer from './slices/todo.slice'


const combieReducers = {
    todo: TodoReducer 
}

export const store = configureStore({
    reducer: combieReducers
})