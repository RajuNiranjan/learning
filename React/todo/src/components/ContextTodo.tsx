import { useTodo } from "../context/useTodo";

export const ContextTodo = () => {
  const {
    task,
    todos,
    handleAddTask,
    handleChangeInput,
    handleCheck,
    handleDeleteTask,
    hanldeUpdateTask,
  } = useTodo();
  return (
    <div className="h-screen p-10 space-y-10 ">
      <h1>Context Todo</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          className="border focus:outline-none"
          value={task}
          onChange={handleChangeInput}
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
                onClick={() => hanldeUpdateTask(item.id)}
                className="bg-green-500 w-max p-2 text-white h-6 flex justify-center items-center rounded-md font-medium cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(item.id)}
                className="bg-red-500 w-max p-2 text-white h-6 flex justify-center items-center rounded-md font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
