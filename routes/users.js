//Router for users
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {check } = require('express-validator');

//Create user
//api/user
router.post('/', 
[
    check('name', 'Name is mandatory').not().isEmpty(),
    check('email', 'Email must be valid').isEmail(),
    check('password', 'Password min. 6 characters').isLength({ min: 6})
],
usersController.createUser);

module.exports = router;