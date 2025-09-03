import { useEffect, useState } from "react";

interface todoPorps {
  _id: string;
  task: string;
  completed: boolean;
}

export const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState<todoPorps[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/todos`);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        const todoToUpdate = todos.find((t) => t._id === editingId);

        await fetch(`${import.meta.env.VITE_API_URL}/todos/${editingId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            task,
            completed: todoToUpdate?.completed ?? false,
          }),
        });
        setEditingId(null);
      } else {
        await fetch(`${import.meta.env.VITE_API_URL}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task, completed: false }),
        });
      }
      setTask("");
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = async (task_id: string) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/todos/${task_id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleComplete = async (task_id: string, completed: boolean) => {
    try {
      const todoToUpdate = todos.find((t) => t._id === task_id);

      await fetch(`${import.meta.env.VITE_API_URL}/todos/${task_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: todoToUpdate?.task,
          completed,
        }),
      });
      fetchTodos();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (task_id: string, taskText: string) => {
    setTask(taskText);
    setEditingId(task_id);
  };

  return (
    <div>
      <h1>Todo</h1>

      <form onSubmit={handleSubmit} className="space-x-3">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border focus:outline-none"
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <div className="mt-4 space-y-2">
        {todos.map((item) => (
          <div key={item._id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.completed}
              onChange={(e) => handleToggleComplete(item._id, e.target.checked)}
            />
            <h1
              className={`flex-1 ${
                item.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {item.task}
            </h1>
            <button
              className="text-green-500"
              onClick={() => handleEdit(item._id, item.task)}
            >
              edit
            </button>
            <button
              className="text-red-500"
              onClick={() => handleDeleteTask(item._id)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
