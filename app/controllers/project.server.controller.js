const Project = require ('../models/project.server.model');

exports.getAllProjects = function(req,  res) {
    Project.getAll(function(result) {
        res.json(result);
    });
};