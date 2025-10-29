import { createContext, type ChangeEvent, type FormEvent } from "react";
import type { TodoType } from "../components/Todo";

type Todo = {
  task: string;
  todos: TodoType[] | [];
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleAddTask: (e: FormEvent<HTMLFormElement>) => void;
  handleCheck: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  hanldeUpdateTask: (id: number) => void;
};

export const TodoContext = createContext<Todo | undefined>(undefined);
