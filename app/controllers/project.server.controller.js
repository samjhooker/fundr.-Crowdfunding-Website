const Project = require ('../models/project.server.model');

exports.getAllProjects = function(req,  res) {
    Project.getAll(function(result) {
        res.json(result);
    });
};
exports.getProjectById = function (req, res) {
    let id = req.params.projectId;
    Project.getProjectById(id, function(result, code){
        res.status(code);
        res.json(result);
    });

}

exports.updateImage = function(req,res){
    console.log("here");
    let id = req.params.projectId;
    let img = req.body;
    console.log(img);




}


exports.createProject = function (req, res){

    let values = [
        req.body.title.toString(),
        req.body.subtitle.toString(),
        req.body.description.toString(),
        req.body.target
    ];

    if(req.body.creators && req.body.rewards) {
        var creators = req.body.creators;
        var rewards = req.body.rewards;
    }else{
        res.status(400);
        res.send("Malformed Request")
    }

    if(values.every(function(i) { return i !== undefined; })){
        Project.createProject(values, creators, rewards, function(result, status) {
            res.status(status);
            res.send(result);

        });
    }else{
        res.status(400);
        res.send("Malformed Request")
    }



}