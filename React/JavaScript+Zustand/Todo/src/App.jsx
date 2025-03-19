import React from "react";
import { TaskInput } from "./Components/TaskInput";
import { TaskList } from "./Components/TaskList";

const Todo = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default Todo;
