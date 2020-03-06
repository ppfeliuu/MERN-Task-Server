//Router for auth users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

//Create user
//api/user
router.post(
  "/",
  [
    check("email", "Email must be valid").isEmail(),
    check("password", "Password min. 6 characters").isLength({ min: 6 })
  ],
  authController.authUser
);

module.exports = router;
