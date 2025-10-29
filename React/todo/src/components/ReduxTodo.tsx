import React, { type ChangeEvent, type FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { addTask, deleteTask, toggle, updateTask } from "../store/todoSlice";
export interface TodoType {
  id: number;
  task: string;
  checked: boolean;
}

export default function ReduxTodo() {
  const [task, setTask] = React.useState("");
  const [editId, setEditId] = React.useState<number | null>(null);

  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      const id = editId;
      dispatch(updateTask({ id, task }));

      setEditId(null);
    } else {
      dispatch(addTask(task));
    }

    setTask("");
  };

  const hanldeDeleteTask = (id: number) => {
    dispatch(deleteTask({ id }));
  };

  const handleCheck = (id: number) => {
    dispatch(toggle({ id }));
  };

  function handleEdit(id: number) {
    const current = todos.find((task) => task.id === id);
    if (current) {
      setEditId(id);
      setTask(current?.task);
    }
  }

  return (
    <div className="h-screen p-10 space-y-10 ">
      <h1>Redux Todo</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          className="border focus:outline-none"
          value={task}
          onChange={onChangeInput}
        />
      </form>

      <div className="space-y-4">
        {todos &&
          todos.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleCheck(item.id)}
              />
              <h1 className={`${item.completed ? "line-through" : ""} `}>
                {item.task}
              </h1>
              <button
                onClick={() => handleEdit(item.id)}
                className="bg-green-500 w-max p-2 text-white h-6 flex justify-center items-center rounded-md font-medium cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => hanldeDeleteTask(item.id)}
                className="bg-red-500 w-max p-2 text-white h-6 flex justify-center items-center rounded-md font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
