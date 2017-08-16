

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


exports.insert  = function(values, done) {
    let params = [values];
    db.get().query('insert into Users (username, location, email, password) values (?)', params, function(err, result) {
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

