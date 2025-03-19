import React, { useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (editTaskId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editTaskId ? { ...todo, task: editTask } : todo
        )
      );
      setEditTaskId(null);
      setEditTask("");
    } else {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask("");
    }
  };

  const handleCompleteTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTask = (id) => {
    const taskToEdit = todos.find((todo) => todo.id === id);
    setEditTaskId(id);
    setEditTask(taskToEdit.task);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold text-center">
          {editTaskId ? "Edit Task" : "Add Task"}
        </h1>
        <form onSubmit={handleAddTask}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={editTaskId ? "Edit your task" : "Add a todo"}
              className="border p-2 rounded-md text-xs w-full"
              value={editTaskId ? editTask : task}
              onChange={(e) =>
                editTaskId
                  ? setEditTask(e.target.value)
                  : setTask(e.target.value)
              }
            />
            <button
              type="submit"
              className="bg-orange-500 text-white rounded-sm p-2"
            >
              {editTaskId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-2">
        {todos.map((task) => (
          <div key={task.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(task.id)}
              className="w-4 h-4 cursor-pointer"
            />
            <h1
              className={`text-xl font-medium ${
                task.completed ? "line-through" : ""
              }`}
            >
              {task.task}
            </h1>
            <button
              onClick={() => handleEditTask(task.id)}
              className="cursor-pointer text-lime-500 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="cursor-pointer text-red-500 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
