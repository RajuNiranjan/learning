import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const newTask = {
                text: action.payload,
                isCompleted: false
            }
            state.todos.push(newTask)
        },
        toggleTodo: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.isCompleted = !todo.isCompleted
            }
        },
        deleteTask: (state, action) => {
            const todo = state.todos.filter(todo => todo.id !== action.payload)
            return todo
        },
        editTask: (state, action) => {
            const { id, task } = action.payload
            const todo = state.todos.find(todo => todo.id === id)
            if (todo) {
                todo.task = task
            }
        }
    }
})


export const { addTodo, toggleTodo, deleteTask, editTask } = todoSlice.actions
export default todoSlice.reducer