import { useContext } from "react"
import { TodoContext } from "./TodoContext"

export const useTodo = () =>{
    const context = useContext(TodoContext)
    if(!context) throw Error("Invaid Context")
    return context
}