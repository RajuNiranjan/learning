import { pool } from "../config/db.js";

export const getAllTodosService = async () => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    return result.rows;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getTodoByIdService = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createTodoService = async (task) => {
  try {
    const result = await pool.query(
      "INSERT INTO todos (task, is_completed) VALUES ($1, $2) RETURNING *",
      [task, false]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateTodoService = async (id, task) => {
  try {
    const result = await pool.query(
      "UPDATE todos SET task = $1 WHERE id = $2 RETURNING *",
      [task, id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const toggleTodoService = async (id) => {
  try {
    const result = await pool.query(
      "UPDATE todos SET is_completed = NOT is_completed WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteTodoService = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
