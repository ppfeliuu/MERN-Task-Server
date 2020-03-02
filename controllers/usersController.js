const User = require('../models/User')

exports.createUser = async (req, res) => {

    console.log(req.body)
  
    try {
        let user;

        //create new user
        user = new User(req.body)

        //save new user
        await user.save();
        
        res.send('User created!')
    } catch (error) {
        console.log(error)
        res.status(400).send('Error')
    }
};
