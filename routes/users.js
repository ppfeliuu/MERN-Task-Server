//Router for users
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Create user
//api/user
router.post('/', usersController.createUser);

module.exports = router;