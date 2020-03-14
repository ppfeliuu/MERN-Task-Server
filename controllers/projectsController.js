const Project = require('../models/Project');
const {
    validationResult
} = require('express-validator');

exports.createProject = async (req, res) => {

    //review error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }


    try {
        const project = new Project(req.body);

        //Save creator
        project.author = req.user.id

        project.save();
        res.json(project)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error project controller')
    }
}

//Get project for the current user

exports.getUserProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            author: req.user.id
        }).sort({
            created: -1
        });
        res.json({
            projects
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Something went wrong!')
    }
}


//Update a project
exports.updateUserProject = async (req, res) => {

    //review error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {
        name
    } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        //Check ID
        let project = await Project.findById(req.params.id);

        //Exist a project?
        if (!project) {
            return res.status(404).json({
                msg: 'Project not found!'
            })
        }

        //Check author
        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!'
            })
        }

        //Update project
        project = await Project.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $set: newProject
        }, {
            new: true
        });

        res.json({
            project
        });



    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')

    }
}

//Delete project by ID

exports.deleteUserProject = async (req, res) => {
    try {
        //Check ID
        let project = await Project.findById(req.params.id);

        //Exist a project?
        if (!project) {
            return res.status(404).json({
                msg: 'Project not found!'
            })
        }

        //Check author
        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'Unauthorized user!'
            })
        }

        //Delete project
        await Project.findOneAndRemove({
            _id: req.params.id
        });
        res.json({
            msg: 'Project deleted!!'
        });

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong!')
    }
}