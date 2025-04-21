import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

export const getAllTasks = async(req, res) =>{
    try {
        const tasks= await prisma.task.findMany()
        return res.status(200).json({
            message: 'Tasks fetched successfully',
            tasks
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

export const createTask = async(req, res) =>{
    try {
        const {task} = req.body
        const newTask = await prisma.task.create({
            data:{
                task
            }
        })
        return res.status(201).json({
            message: 'Task created successfully',
            newTask
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
        
    }
}

export const updateTask = async(req, res) =>{
    try {
    const {id} = req.params
    const {task, is_completed} = req.body
    const updatedTask = await prisma.task.update({
        where:{id: Number(id)},
        data:{task, is_completed}
    })
    return res.status(200).json({
        message: 'Task updated successfully',
        updatedTask
    })
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

export const deleteTask = async(req, res) =>{
    try {
        const {id} = req.params
       const task = await prisma.task.delete({
        where:{
            id: Number(id)
        }
       })
        return res.status(200).json({
            message: 'Task deleted successfully',
            task
        })
    } catch (error) {
    console.log(error);
    }
}