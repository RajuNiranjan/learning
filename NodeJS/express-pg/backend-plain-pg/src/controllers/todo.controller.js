import {
  getTodos,
  taskCreate,
  taskDelete,
  taskUpdate,
} from "../models/todo.model.js";

export const taskCreateController = async (req, res) => {
  try {
    const task = req.body.task;
    const created = await taskCreate(task);

    return res.json(created);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create task" });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getTodos(); // rename the variable
    return res.json(tasks); // send response correctly
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const taskUpdateController = async (req, res) => {
  try {
    const { id } = req.params; // id from URL
    const { task, is_completed } = req.body; // optional fields

    const updated = await taskUpdate({
      id,
      task,
      is_completed,
    });

    return res.json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "update failed" });
  }
};
export const taskDeleteController = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await taskDelete({ id });
    return res.json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "delete failed" });
  }
};
