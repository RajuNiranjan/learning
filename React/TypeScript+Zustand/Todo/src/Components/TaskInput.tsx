import React, { useState } from "react";
import { todoStore } from "../zustand/store/todoStore";

export const TaskInput = () => {
  const [task, setTask] = useState("");
  const { addTask } = todoStore();
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <form className="flex items-center" onSubmit={handleAddTask}>
      <input
        type="text"
        placeholder="enter task here"
        className="border rounded-sm w-full p-2 text-sm"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </form>
  );
};
