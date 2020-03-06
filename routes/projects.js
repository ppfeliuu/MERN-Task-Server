const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectsController');

//Crea projects

router.post('/', projectController.createProject);

module.exports = router;