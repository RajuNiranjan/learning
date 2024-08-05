import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    loading: false,
    error: null
}

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createTask: (state, action) => {
            const newTask = {
                text: action.payload.text,
                isCompleted: false
            }
        },
        toggleTask: (state, action) => {
            const task = state.todos.find(task => task.id === action.payload)

            if (task) {
                task.isCompleted = !task.isCompleted
            }
        },
        deleteTask: (state, action) => {
            const task = state.todos.find(task => task.id !== action.payload)
        }
    }
})

export const { createTask, toggleTask, deleteTask } = TodoSlice.actions

export default TodoSlice.reducer