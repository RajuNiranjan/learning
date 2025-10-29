import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Todo{
    id:number;
    task: string;
    completed:boolean
}

interface TodoState {
    todos: Todo[]
}

const initialState:TodoState = {
    todos: []
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        addTask: (state, action:PayloadAction<string>)=>{
            const task = {id: Date.now(), task: action.payload, completed: false}
            state.todos.push(task)
        },
        updateTask: (state, action: PayloadAction<{id:number, task:string}>)=>{
            state.todos = state.todos.map(item => item.id === action.payload.id ? {...item, task:action.payload.task}:item)
        },
        toggle: (state, action: PayloadAction<{id:number}>)=>{
            state.todos = state.todos.map(item => item.id === action.payload.id ? {...item, completed:!item.completed}:item)
        },
        deleteTask: (state, action: PayloadAction<{id:number}>) =>{
            state.todos = state.todos.filter(t => t.id !== action.payload.id)
        }
    }
})

export const {addTask,deleteTask,toggle,updateTask} = todoSlice.actions

export default todoSlice.reducer