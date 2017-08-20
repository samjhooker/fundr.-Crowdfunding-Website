
const db = require('../../config/db.js');


function getCreatorsForProjectId(id, done){
    db.get().query('select * from Creator where project_id='+ id, function(err, rows) {
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

function getProjectForProjectId(id, done){
    db.get().query('select * from Projects where project_id='+ id, function(err, rows) {
        if (err) {
            return done({ERROR: 'Error finding project'})
        };
        if(rows[0]) {
            var item = rows[0]
            return done(item);
        }
        return done({ERROR: 'Not found'})
    });
}



exports.getProjectById = function(id, done){

    getBackersForProjectId(id, function (backers){
        if(backers.ERROR) {
            done({ERROR: "BACKERS SQL ERROR"}, 500);
            return;
        }
        getRewardsForProjectId(id, function (rewards){
            if(rewards.ERROR){
                done({ERROR: "REWARDS SQL ERROR"}, 500);
                return;
            }
            getCreatorsForProjectId(id, function (creators){
                if(creators.ERROR) {
                    done({ERROR: "CREATORS SQL ERROR"}, 500);
                    return;
                }
                getProjectForProjectId(id, function(project){
                    if(project.ERROR){
                        done({ERROR: "Not Found"}, 404);
                        return;
                    }


                    var numPledges = 0;
                    var pledge = 0;
                    backers.forEach(function (b) {
                        if(b.amount) pledge += b.amount;
                        numPledges++;

                    })


                    var obj = {
                        "project": {
                            "id": project.project_id,
                            "creationDate": project.creation_date,
                            "data": {
                                "title": project.title,
                                "subtitle": project.subtitle,
                                "description": project.description,
                                "imageUri": "/api/v1/projects/" + project.project_id + "/images/",
                                "target": project.title,
                                "creators": creators,
                                "rewards": rewards,
                            },
                        },
                        "progress":{
                            "target": project.title,
                            "currentPledged":pledge,
                            "numberOfBackers":numPledges
                        },
                        "backers":backers
                    };

                    done(obj, 200);




                });
            });
        });
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




function createProjectHelper(values, done){
    var vals = [values];
    db.get().query('insert into Projects(title, subtitle, description, target) values (?)', vals, function(err, rows) {
        if (err) {
            return done({ERROR: 'Projects SQL Error'}, 500);
        };
        return done(rows, 201);
    });
}

function createCreatorHelper(project_id, creators, done) {
    var creatorsString = '';
    creators.forEach(function (c) {
        if(c.name && c.id){
            var line= ' ('+c.id+', '+ project_id +', "'+c.name +'"),'
            creatorsString +=line;
        }
    })
    if(creatorsString != '') {
        creatorsString = creatorsString.substring(0, creatorsString.length - 1);
        creatorsString += ";"
    }else{
        return done("empty", 200);
    }

    var query = 'insert into Creator (user_id, project_id, name) values' + creatorsString;
    db.get().query(query, function(err, rows) {
        if (err) {
            return done({ERROR: 'Creators SQL Error'}, 500);
        };
        return done(rows, 201);
    });

}

function createRewardHelper(project_id, rewards, done) {
    var rewardString = '';
    rewards.forEach(function (c) {
        if(c.id && c.amount && c.description){
            var line= ' (' + project_id + ', '+ c.amount +', "'+c.description +'"),'
            rewardString +=line;
        }
    })
    if(rewardString != '') {
        rewardString = rewardString.substring(0, rewardString.length - 1);
        rewardString += ";"
    }else{
        return done("empty", 200);
    }
    var query = 'insert into Rewards (project_id, amount, description) values'+ rewardString;
    db.get().query(query, function(err, rows) {
        if (err) {
            return done({ERROR: 'Rewards SQL Error'}, 500);
        };
        return done(rows, 201);
    });

}




exports.createProject = function(values, creators, rewards, done){

    createProjectHelper(values, function (projectResult, status) {
        if(projectResult.ERROR) return done(projectResult, status);
        console.log(projectResult);
        if(!projectResult.insertId) return done("Error creating Project", 500);
        var project_id = projectResult.insertId;

        createCreatorHelper(project_id, creators, function (creatorResult, status){
            if(creatorResult.ERROR) return done(creatorResult, status);

            createRewardHelper(project_id, rewards, function (rewardResult, status) {
                if(rewardResult.ERROR) return done(rewardResult, status);

                return done("OK", 201);

            })

        })
    })


}

exports.updateProject = function(id, value, done){

    var query = 'update Projects set project_open = '+value+ ' where project_id = ' + id;
    db.get().query(query, function(err, rows) {
        if (err) {
            return done({ERROR: 'update SQL Error'}, 500);
        };
        if(rows.affectedRows == 1){
            return done("OK", 201);
        }else{
            return done("not Found", 404)
        }
    });

}