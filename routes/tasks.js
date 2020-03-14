const express = require('express')
const router = express.Router()
const taskController = require('../controllers/tasksController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

//api/task

router.post(
    '/',
    auth,
    [
        check('name', 'Task name is mandatory')
            .not()
            .isEmpty(),
        check('project', 'Project name is mandatory')
            .not()
            .isEmpty(),
    ],
    taskController.createTask
)

router.get('/', auth, taskController.getProjectTasks)
router.put('/:id', auth, taskController.updateTask)
router.delete('/:id', auth, taskController.deleteTask)

module.exports = router
