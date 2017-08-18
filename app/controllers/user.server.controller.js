const  User  =  require ('../models/user.server.model');
var jwt = require('jsonwebtoken');
const express = require('express');
const app = express();



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

    console.log(   values);

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
            return res.json({id: result.id, token: jwt.sign(result, "SECRET")});
        }
    });
};



exports.logout  =  function(req,  res) {
    return null ;
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
    var isUser = checkTokenValid(req, res);
    if (isUser) {
        console.log(req.user)
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized User' });
    }
};