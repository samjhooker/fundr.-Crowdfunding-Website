
const db = require('../../config/db.js');

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
                "imageUrl": "/api/v1/"+item.project_id+"/image"
            }
            res.push(new_item)

        }
        return done(res);
    });
};