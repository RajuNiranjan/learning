import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTask } from "../redux/Actions/todo.action";

const Todo = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo.todos);

  console.log(todos);

  const handleChangeText = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    try {
      const res = await axios.post("/api/todo/create_task", { task });
      const data = res.data;
      console.log(data);
      dispatch(addTodo(data));
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl font-bold">Todo</h1>
      <form
        onSubmit={handleAddTask}
        className="w-[450px] border rounded-lg shadow-lg p-4"
      >
        <div className="flex justify-between items-center gap-2">
          <input
            type="text"
            id="name"
            className="focus:outline-none p-3 rounded-lg w-full border"
            required
            value={task}
            onChange={handleChangeText}
          />
          <button className="p-3 bg-green-500 rounded-lg font-semibold text-white">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
