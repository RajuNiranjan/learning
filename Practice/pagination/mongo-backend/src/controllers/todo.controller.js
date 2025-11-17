import { TodoModel } from "../models/todo.model.js";

export const taskCreateController = async (req, res) => {
  const { task } = req.body;

  if (!task || !task.trim()) {
    return res.status(400).json({ message: "Task should not be empty" });
  }

  try {
    const todo = new TodoModel({ task: task.trim() });
    await todo.save();

    return res.status(201).json({ message: "Task added", task: todo });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTodos = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;
  try {
    const [todos, total] = await Promise.all([
      TodoModel.find().skip(skip).limit(limit),
      TodoModel.countDocuments(),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
      todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTaskController = async (req, res) => {
  const { task, is_completed } = req.body;
  const { taskId } = req.params;

  try {
    const todo = await TodoModel.findById(taskId);
    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updateData = {};

    if (task !== undefined) updateData.task = task;
    if (is_completed !== undefined) updateData.is_completed = is_completed;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });

    return res.status(200).json({
      message: "Task updated",
      task: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTaskController = async (req, res) => {
  const { taskId } = req.params;

  try {
    const deleted = await TodoModel.findByIdAndDelete(taskId);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
