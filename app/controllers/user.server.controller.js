const  User  =  require ('../models/user.server.model');


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
    return null ;
  };
exports.delete  =  function(req,  res) {
    return null ;
  };


exports.login  =  function(req,  res) {
    return null ;
};
exports.logout  =  function(req,  res) {
    return null ;
};
