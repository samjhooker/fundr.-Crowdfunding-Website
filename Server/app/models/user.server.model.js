

const db = require('../../config/db.js');

exports.getAll = function(done) {
    db.get().query('select * from Users', function(err, rows) {
        if (err) {
          return done({ERROR: 'Error selecting'})
        };
        var res = [];
        for(var index in rows){
            var item = rows[index]

            var new_item = {
                "id": item.user_id,
                "username": item.username,
                "location": item.location,
                "email": item.email
            }
            res.push(new_item)

        }
        return done(res);
      });
  };




exports.userById  =  function(id, done) {

    var query = 'select * from Users where user_id = ' + id;
    db.get().query(query, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error selecting'})
        };
        var item = rows[0]

        if(item){
            var new_item = {
                "id": item.user_id,
                "username": item.username,
                "location": item.location,
                "email": item.email
            }
            return done(new_item);
        }else{
            return done({ERROR: 'User Not Found'})
        }
    });
  };


exports.userByUsernameAndPassword = function(username, pswd, done){
    var query = 'select * from Users where username = "'+ username + '" and password = "' + pswd + '"';
    db.get().query(query, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error selecting'})
        };
        var item = rows[0]

        if(item){
            var new_item = {
                "id": item.user_id,
                "username": item.username,
                "location": item.location,
                "email": item.email
            }
            return done(new_item);
        }else{
            return done({ERROR: 'User Not Found'})
        }
    });

};

exports.insert  = function(values, done) {
    let params = [values];


    db.get().query('insert into Users (username, location, email, password) values (?)', params, function(err, result) {
        if (err){
            done(err)
        } 
        done(result);
      });
  };

exports.update  = function(values, done) {

    var query = 'update Users set username="'+values[1]+'", location="' + values[2] +
        '", email="' +values[3]+ '" where user_id='+values[0]+ ' and password = "' + values[4] + '"';
    db.get().query(query, function(err, result) {
        if (err){
            done(err)
        }
        done(result);
    });
};


exports.alter  =  function() {
    return null;
  };
exports.remove  =  function() {
    return null;
  };



exports.deleteUser = function (id, done) {
    var query = 'update Users set active = 0 where user_id = ?';
    db.get().query(query, id, function(err, result) {
        if (err){
            return done(err, 500);
        }
        if (result.affectedRows >= 1){
            return done("user deleted", 200);
        }else{
            return done("User not found", 404);
        }
    });
}