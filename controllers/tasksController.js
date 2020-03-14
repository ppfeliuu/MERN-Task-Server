const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createTask = async (req, res) => {
    //review error
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        })
    }

    const { project } = req.body

    try {
        const exitsProject = await Project.findById(project)
        if (!exitsProject) {
            return res.status(404).json({
                msg: 'Project not found!',
            })
        }

        //Check author
        if (exitsProject.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!',
            })
        }

        //Create task
        const task = new Task(req.body)
        await task.save()
        res.json({ task })
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}

//get task by projet

exports.getProjectTasks = async (req, res) => {
    try {
        const { project } = req.body

        const exitsProject = await Project.findById(project)
        if (!exitsProject) {
            return res.status(404).json({
                msg: 'Project not found!',
            })
        }

        //Check author
        if (exitsProject.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!',
            })
        }

        //Get task by projcect
        const tasks = await Task.find({ project })
        res.json({ tasks })
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { project, name, status } = req.body

        let task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({
                msg: 'Task not found!',
            })
        }

        const exitsProject = await Project.findById(project)
        //Check author
        if (exitsProject.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!',
            })
        }

        //Create a object with new info
        const newTask = {}

        if (name) {
            newTask.name = name
        }

        if (status) {
            newTask.status = status
        }

        task = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
            new: true,
        })

        res.json({ task })
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { project } = req.body

        let task = await Task.findById(req.params.id)
        if (!task) {
            return res.status(404).json({
                msg: 'Task not found!',
            })
        }

        const exitsProject = await Project.findById(project)
        //Check author
        if (exitsProject.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!',
            })
        }

        //delete task
        await Task.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Task deleted!' })
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}
