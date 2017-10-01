const Project = require ('../models/project.server.model');
var fs = require("fs");


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
    let id = req.params.projectId;

    if(req.file){
        if(req.file.buffer){
            var imgData = req.file.buffer;
            Project.updateImage(id, imgData, function (result, code) {
                res.status(code);
                res.send(result)
            })
        }else{
            res.status(400);
            res.send("Malformed Request")
        }
    }else{
        res.status(400);
        res.send("Malformed Request")
    }
}

exports.getImage = function(req, res){
    let id = req.params.projectId;
    Project.getImage(id, function(result, code){
        if(result == null){
            res.status(200);
            res.send("OK")
            return
        }
        if(result.ERROR){
            res.status(code);
            res.send(result);
            return;
        }

        fs.writeFile(__dirname+'/img.jpg', result, 'binary', function(err) {
            if(err){
                res.status(500);
                res.send({ERROR: "There was an error recreating the image"});
            }else{
                res.status(200);
                var imageName = __dirname + '/img.jpg';
                res.sendFile(imageName);
            }
        });



    });

}


exports.createProject = function (req, res){

    try{
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
    } catch (err){
        res.status(400);
        res.send("Malformed Request")
    }



};


exports.updateProject = function(req, res){
    try{
        if(req.body.open != true && req.body.open != false){
            res.status(400);
            return res.send("Malformed Request");
        }

        var value = (req.body.open == true) ? 1 : 0;
        let id = req.params.projectId;

        Project.updateProject(id, value, function(result, status){
            res.status(status);
            res.send(result);
        })
    } catch (err){
        res.status(400);
        return res.send("Malformed Request");
    }



}

exports.pledge = function (req, res){

    try{
        let id = req.params.projectId;

        if(!req.body.id){
            res.status(401);
            return res.send("Unauthorized - create account to pledge to a project")
        }

        let values = [
            req.body.id,
            req.body.amount,
            (req.body.anonymous == true) ? 1 : 0,
            req.body.card.authToken.toString()
        ];

        if(values.every(function(i) { return i !== undefined; })) {

            Project.createPledge(id, values, function(result, status){
                res.status(status);
                return res.send(result);
            })

        }else{
            res.status(400);
            return res.send("Bad user, project, or pledge details")
        }
    } catch (err){
        res.status(400);
        return res.send("Bad user, project, or pledge details")
    }
}

exports.getRewards = function(req, res){
    let id = req.params.projectId;
    Project.getRewards(id, function(result, status){
       res.status(status);
       res.send(result);
    });


}

exports.createReward = function(req, res){
    let id = req.params.projectId;
    var values = req.body;

    Project.createReward(id, values, function(result, status){
        res.status(status);
        return res.send(result);
    });


}