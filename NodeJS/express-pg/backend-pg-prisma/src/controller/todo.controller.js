import { prisma } from "../utils/prisma.js";

export const taskCreateController = async (req, res) => {
  try {
    const { task } = req.body; // get the field you want to insert

    const created = await prisma.todo.create({
      data: { task },
    });

    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "create failed" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { id: "asc" },
    });

    return res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to fetch todos" });
  }
};

export const updateTodos = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, is_completed } = req.body;

    const updated = await prisma.todo.update({
      where: { id: Number(id) },
      data: {
        task: task ?? undefined,
        is_completed: is_completed ?? undefined,
      },
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to update todo" });
  }
};

export const deleteTodos = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await prisma.todo.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "failed to delete todo" });
  }
};
