import React, { type ChangeEvent, type FormEvent } from "react";

export interface TodoType {
  id: number;
  task: string;
  checked: boolean;
}

export default function Todo() {
  const [task, setTask] = React.useState("");
  const [todos, setTodos] = React.useState<TodoType[] | []>([]);
  const [editId, setEditId] = React.useState<number | null>(null);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId) {
      setTodos((prev) =>
        prev.map((item) => (item.id === editId ? { ...item, task } : item))
      );

      setEditId(null);
    } else {
      setTodos((prev) => [...prev, { id: Date.now(), checked: false, task }]);
    }

    setTask("");
  };

  const hanldeDeleteTask = (id: number) => {
    setTodos(todos.filter((task) => task.id !== id));
  };

  const handleCheck = (id: number) => {
    console.log(id);
    setTodos(
      todos.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
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
      <h1>Todo</h1>
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
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <h1 className={`${item.checked ? "line-through" : ""} `}>
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
