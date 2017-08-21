const  User  =  require ('../models/user.server.model');
const  Project  =  require ('../models/project.server.model');

var jwt = require('jsonwebtoken');



exports.list  =  function(req,  res) {
    User.getAll(function(result) {
        res.json(result);
      });
  };





exports.create = function(req, res) {

    try{
        let values = [
            req.body.user.username.toString(),
            req.body.user.location.toString(),
            req.body.user.email.toString(),
            req.body.password.toString()
        ];

        User.insert(values, function(result) {
            if(result.insertId){
                res.status(201);
                res.json(result.insertId);

            }else{
                res.status(500);
                res.send("SQL Error");
            }
        });

    } catch (err){
        res.status(400);
        res.send("Malformed Request")
    }

  };


//gets one user with ID
exports.userById  =  function(req,  res) {
    let id = req.params.userId;

    User.userById(id, function(result) {
        res.json(result);
    });

};

exports.update  =  function(req,  res) {
    let id = req.params.userId;

    let values = [
        id,
        req.body.user.username.toString(),
        req.body.user.location.toString(),
        req.body.user.email.toString(),
        req.body.password.toString()
    ];

    if(values.every(function(i) { return i !== undefined; })){
        User.update(values, function(result) {
            console.log( result);
            if(result.affectedRows == 1){
                res.status(200);
                res.send("OK");

            }else{
                res.status(404);
                res.send("User not found");
            }
        });
    }else{
        res.status(400);
        res.send("Malformed Request")
    }

};


exports.delete  =  function(req,  res) {
    return null ;
  };


exports.login  =  function(req,  res) {

    try{
        var username = req.body.username;
        var password = req.body.password;

        if(!username || !password){
            res.status(400).send("Invalid username/password supplied");
            return;
        }

        User.userByUsernameAndPassword(username, password, function(result) {
            if(result.ERROR){
                res.status(400).send(result);
                return;
            }else{
                var token = jwt.sign(result, "SECRET");
                user = null;
                user = result;
                user.token = token;
                return res.json({id: result.id, token: token});
            }
        });

    }catch(err){
        res.status(400).send("Malformed request");
    }
};



exports.logout  =  function(req,  res) {
    if(user){
        user = null;
        return res.status(200).send("OK");
    }
    return
};


function checkTokenValid(req, res) {
    console.log("this does something");
    console.log(req.headers.authorization);
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'jwt') {
        console.log("got here" +
            "")
        jwt.verify(req.headers.authorization.split(' ')[1], "SECRET", function (err, decode) {
            if (err){
                req.user = undefined;
                return false;
            }
            req.user = decode;
            return true;
        });
    } else {
        req.user = undefined;
        return false;
    }
}

exports.loginRequired = function(req, res, next) {
    console.log(req.headers['x-authorization']);
    if (req.headers && req.headers['x-authorization'] && req.headers['x-authorization'].split(' ')[0] === 'jwt') {
        if(user && user.token == req.headers['x-authorization'].split(' ')[1]){
            next();
        }else{
            return res.status(401).send('Unauthorized - not logged in');
        }
    }else{
        return res.status(401).send('Unauthorized - not logged in');
    }
};

exports.userLoginRequired = function (req, res, next) {
    let id = req.params.userId;
    if(!id || !user){
        return res.status(403).send('Forbidden - account not owned');
    }
    if(user.id == id){
        next();
    }else{
        return res.status(403).send('Forbidden - account not owned');
    }
}

exports.projectLoginRequired = function(req, result, next){

    if(req.params.projectId && user){
        var isCreator = false;

        let projectId = req.params.projectId;
        let userId = user.id;


        Project.getCreatorsForProject(projectId, function (res) {

            res.forEach(function (c) {
                if(c.id == userId)isCreator = true;
            })

            if(isCreator){
                next();
            }else{
                return result.status(403).send('Forbidden - unable to update a project you do not own');
            }

        })


    }else{
        return res.status(403).send('Forbidden - unable to update a project you do not own');
    }

}


exports.noProjectLogin = function(req, result, next){

    if(req.params.projectId && user){
        var isCreator = false;

        let projectId = req.params.projectId;
        let userId = user.id;

        Project.getCreatorsForProject(projectId, function (res) {
            res.forEach(function (c) {
                if(c.id == userId){
                    isCreator = true;
                }
            })

            if(isCreator){
                return result.status(403).send('Forbidden - cannot pledge to own project - this is fraud!');
            }else{
                next();
            }
        })


    }else{
        return result.status(403).send('Forbidden - cannot pledge to own project - this is fraud!');
    }

}