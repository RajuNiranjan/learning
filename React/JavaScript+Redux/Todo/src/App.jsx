import React from "react";
import { TaskInput } from "./Components/TaskInput";
import { TaskList } from "./Components/TaskList";

const App = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
