import React, { useState } from "react";
import {
  addTask,
  deleteTask,
  editTask,
  toggleTask,
} from "./redux/Actions/todoSlice.action";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const dispatch = useDispatch();

  const todo = useSelector((state) => state.todo.todos);

  const handleDeleteTask = (id) => {
    console.log(id);
    dispatch(deleteTask(id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    else if (editTaskId) {
      dispatch(editTask({ id: editTaskId, task: task }));
      setEditTaskId(null);
    } else {
      dispatch(addTask(task));
    }
    setTask("");
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask(id));
  };

  const handleEditTask = (id, task) => {
    setTask(task);
    setEditTaskId(id);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <form
          onSubmit={handleAddTask}
          className="w-[450px] p-4 border rounded-lg shadow-lg"
        >
          <div className="flex justify-between items-center gap-2">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="p-3 rounded-lg border w-full"
            />
            <button
              type="submit"
              className="bg-lime-500 p-3 rounded-lg text-white font-semibold"
            >
              Add
            </button>
          </div>
        </form>

        <div>
          {todo.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleToggleTask(item.id)}
                />
                <h1 className={`${item.isChecked ? "line-through" : ""}`}>
                  {item.task}
                </h1>
              </div>
              <div className="flex gap-2">
                <small
                  className="text-lime-500 cursor-pointer"
                  onClick={() => handleEditTask(item.id, item.task)}
                >
                  edit
                </small>
                <small
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  delete
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
