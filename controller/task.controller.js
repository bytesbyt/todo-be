const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
    try {
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();
        res.status(200).json({status: 'success', data: newTask});
    } catch (error){
        res.status(400).json({status: 'error', error: error});
    }
};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find().select("-__v");
        res.status(200).json({status: 'success', data: taskList});
    } catch (error){
        res.status(400).json({status: 'error', error: error});
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, isComplete } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(id, { task, isComplete }, { new: true, runValidators: true});
        if (!updatedTask){
            return res.status(404).json({status: 'error', error: 'Task not found'});
        }
        res.status(200).json({status: 'success', data: updatedTask});
    } catch (error){
        res.status(400).json({status: 'error', error: error});
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask){
            return res.status(404).json({status: 'error', error: 'Task not found'});
        }
        res.status(200).json({status: 'success', message: 'Task deleted successfully'});
    } catch (error){
        res.status(400).json({status: 'error', error: error});
    }
};

module.exports = taskController;
