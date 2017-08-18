
const db = require('../../config/db.js');


function getCreatorsForProjectId(id, done){
    db.get().query('select * from Creators where project_id='+ id, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error finding creators'})
        };
        var res = [];
        for(var index in rows){
            var item = rows[index]

            var new_item = {
                "id": item.user_id,
                "name": item.name
            }
            res.push(new_item)

        }
        return done(res);
    });
}

function getBackersForProjectId(id, done){
    db.get().query('select * from Backers where project_id='+ id, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error finding backers'})
        };
        var res = [];
        for(var index in rows){
            var item = rows[index]

            var new_item = {
                "name": item.name,
                "amount": item.amount
            }
            res.push(new_item)

        }
        return done(res);
    });
}


function getRewardsForProjectId(id, done){
    db.get().query('select * from Rewards where project_id='+ id, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error finding rewards'})
        };
        var res = [];
        for(var index in rows){
            var item = rows[index]

            var new_item = {
                "id": item.reward_id,
                "amount": item.amount,
                "description": item.description
            }
            res.push(new_item)

        }
        return done(res);
    });
}






exports.getAll = function(done) {
    db.get().query('select * from Projects', function(err, rows) {
        if (err) {
            return done({ERROR: 'Error finding projects'})
        };
        var res = [];
        for(var index in rows){
            var item = rows[index]

            var new_item = {
                "id": item.project_id,
                "title": item.title,
                "subtitle": item.subtitle,
                "imageUrl": "/api/v1/projects/"+item.project_id+"/image"
            }
            res.push(new_item)

        }
        return done(res);
    });
};