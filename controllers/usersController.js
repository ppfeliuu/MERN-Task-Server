const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
    //review error
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ msg: 'User already exist!!' })
        }

        //create new user
        user = new User(req.body)

        //Hash password
        const salt = await bcryptjs.genSalt(10)

        user.password = await bcryptjs.hash(password, salt)

        //save new user
        await user.save()

        //Create and sign JWT
        const payload = {
            user: {
                id: user.id,
            },
        }

        //sign JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error

                res.json({ token })
            }
        )

        // res.json({ msg: "User created successfullyt!!" });
    } catch (error) {
        console.log(error)
        res.status(400).json({ msg: 'Error creating user' })
    }
}
