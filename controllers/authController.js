const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // get user and pass
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User doesn't exist!!" });
    }

    const passOK = await bcryptjs.compare(password, user.password);

    if (!passOK) {
      return res.status(400).json({ msg: "Password went wrong!" });
    }

    // If all OK
    //Create and sign JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    //sign JWT
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
