import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: []
}

const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = {
                id: Date.now(),
                task: action.payload,
                isChecked: false
            }
            state.todos.push(newTask)
        },
        toggleTask: (state, action) => {
            const task = state.todos.find(task => task.id === action.payload)
            if (task) {
                task.isChecked = !task.isChecked
            }
        },
        deleteTask: (state, action) => {
            state.todos = state.todos.filter(task => task.id !== action.payload)
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

export const { addTask, deleteTask, editTask, toggleTask } = TodoSlice.actions

export default TodoSlice.reducer