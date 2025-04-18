import { pool } from "../config/db.js";


export const getAllUsersService = async () =>{
    try {
        const result = await pool.query("SELECT * FROM users")
        return result.rows
    } catch (error) {
        throw new Error(error)
    }
}
export const getUserByIdService = async (id) =>{
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id])
        if (result.rows.length === 0) {
            return null
        }
        return result.rows[0]
    } catch (error) {
        throw new Error(`Database error: ${error.message}`)
    }
}
export const createUserService = async (name, email) =>{
    try {
        const result = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *", [name, email])
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}
export const updateUserService = async (id, name ,email) =>{
    try {
        const result = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name, email, id])
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
    }
}
export const deleteUserService = async (id) =>{
    try {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id])
        return result.rows[0]
    } catch (error) {
        throw new Error(error)
        
    }
}