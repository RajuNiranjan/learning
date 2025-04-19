import { createUserService , getAllUsersService, getUserByIdService, updateUserService, deleteUserService } from '../models/user.model.js'

export const createUser = async(req, res ) =>{
    try {
        const {name, email, } = req.body

        const user = await createUserService(name, email)
        if(!user){
            return res.status(400).json({
                message: "User not created",
                error: "User not created"
            })
        }
        res.status(201).json({
            message: "User created successfully",
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        })
    }
}

export const getUsers = async(req, res ) =>{
    try {
        const users = await getAllUsersService()
        if(!users){
            return res.status(400).json({
                message: "Users not found",
                error: "Users not found"
            })
        }
        res.status(200).json({
            message: "Users fetched successfully",
            data: users
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting users",
            error: error.message
        })
    }   
}

export const getUserById = async(req, res ) =>{
    try {
        const {id} = req.params
        const user = await getUserByIdService(id)
        if(!user){
            return res.status(400).json({
                message: "User not found",
                error: "User not found"
            })
        }
        res.status(200).json({
            message: "User fetched successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting user by id",
            error: error.message
        })
    }
}

export const updateUser = async(req, res ) =>{
    try {
        const {id} = req.params
        const {name, email} = req.body
        const user = await updateUserService(id, name, email)
        if(!user){
            return res.status(400).json({
                message: "User not updated",
                error: "User not updated"
            })
        }
        res.status(200).json({
            message: "User updated successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        })
    }
}

export const deleteUser = async(req, res ) =>{
    try {
        const {id} = req.params
        const user = await deleteUserService(id)
        if(!user){
            return res.status(400).json({
                message: "User not deleted",
                error: "User not deleted"
            })  
        }
        res.status(200).json({
            message: "User deleted successfully",
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        })
    }
}