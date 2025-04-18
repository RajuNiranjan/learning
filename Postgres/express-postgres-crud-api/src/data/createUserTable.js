import { pool } from "../config/db.js";

export const createUserTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `)
        console.log("User table created successfully");
    } catch (error) {
        console.error("Error creating user table:", error);
        throw error;
    }
}