import { useContext } from "react"
import { CounterContext } from "./ConterContext"

export const useCounter = () =>{
    const context = useContext(CounterContext)
    if(!context)  throw Error("Context not provided")
    return context
}