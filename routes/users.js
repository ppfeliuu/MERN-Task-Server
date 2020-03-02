//Router for users
const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

//Create user
//api/user
router.post('/', userController.createUser);

module.exports = router;