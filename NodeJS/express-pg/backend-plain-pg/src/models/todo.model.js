import { pool } from "../config/db.js";

export const taskCreate = async (task) => {
  try {
    const res = await pool.query(
      `
        INSERT INTO todo (task)
        VALUES ($1)
        RETURNING *
      `,
      [task]
    );

    return res.rows[0];
  } catch (err) {
    console.error("Error inserting task:", err);
    throw err;
  }
};

export const getTodos = async () => {
  try {
    const res = await pool.query(
      `
           SELECT * FROM todo 
            `
    );

    return res.rows;
  } catch (error) {
    console.log(error);
  }
};

export const taskUpdate = async ({ id, task, is_completed }) => {
  try {
    const res = await pool.query(
      `
        UPDATE todo
        SET
          task = COALESCE($1, task),
          is_completed = COALESCE($2, is_completed)
        WHERE id = $3
        RETURNING *
      `,
      [task, is_completed, id]
    );

    return res.rows[0];
  } catch (error) {
    console.log(error);
  }
};

export const taskDelete = async ({ id }) => {
  try {
    const res = await pool.query(
      `
        DELETE FROM todo
        WHERE id = $1
        RETURNING *
      `,
      [id]
    );

    return res.rows[0]; // deleted row
  } catch (error) {
    console.log(error);
  }
};
