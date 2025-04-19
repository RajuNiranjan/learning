import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
  getTodoByIdService,
  toggleTodoService,
  updateTodoService,
} from "../models/todo.model.js";

export const getAllTodosController = async (req, res) => {
  try {
    const todos = await getAllTodosService();
    return res
      .status(200)
      .json({ message: "todos fetched successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getTodoByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTodoByIdService(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: "task is not found with this id" });
    }

    return res.status(200).json({ message: "task fetched successfully", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const createTodoController = async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: "task is required" });
    }

    const newTask = await createTodoService(task);
    return res
      .status(201)
      .json({ message: "task created successfully", newTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isCompleted } = req.body;

    if (!task) {
      return res.status(400).json({ message: "task is required" });
    }

    const updatedTask = await updateTodoService(id, task);

    return res
      .status(200)
      .json({ message: "task updated successfully", updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const toggleTodoController = async (req, res) => {
  try {
    const { id } = req.params;
    const toggleTask = await toggleTodoService(id);
    return res
      .status(200)
      .json({ message: "task toggled successfully", toggleTask });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await deleteTodoService(id);
    return res.status(200).json({ message: "task deleted successfully", task });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
