const Project = require ('../models/project.server.model');

exports.getAllProjects = function(req,  res) {
    Project.getAll(function(result) {
        res.json(result);
    });
};
exports.getProjectById = function (req, res) {
    let id = req.params.projectId;
    Project.getProjectById(id, function(result){
        res.json(result)
    });

}