import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
    editTaskId: null
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.todos.push({id: Date.now(), task: action.payload, completed: false})
        },
        toggleTask: (state, action) => {
            state.todos = state.todos.map(todo => 
                todo.id === action.payload ? {...todo, completed: !todo.completed} : todo
            )
        },
        deleteTask: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
       

    }
})

export const {addTask, toggleTask, deleteTask,  } = todoSlice.actions
export default todoSlice.reducer