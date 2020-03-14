const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectsController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

//Crea projects

router.post('/',auth, [ check('name', 'Project name is mandatory').not().isEmpty()],  projectController.createProject);

router.get('/',auth,  projectController.getUserProjects);

router.put('/:id', auth, [ check('name', 'Project name is mandatory').not().isEmpty()], projectController.updateUserProject);

router.delete('/:id',auth,  projectController.deleteUserProject);

module.exports = router;