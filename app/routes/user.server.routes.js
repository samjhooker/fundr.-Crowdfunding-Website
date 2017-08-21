const  users  =  require ('../controllers/user.server.controller');
const  projects  =  require ('../controllers/project.server.controller');
const  bodyParser = require('body-parser');



const jsonParse  = bodyParser.json({
        extended: true
    });

let multer = require('multer');
var storage = multer.memoryStorage()
let upload = multer({storage:storage});


module.exports  =  function(app) {
    app.route ('/api/v1/users')
        .post (jsonParse, users.create);
    app.route ('/api/v1/users/:userId')
        .get(jsonParse, users.userById)
        .put(jsonParse, users.loginRequired, users.userLoginRequired, users.update)
        .delete(jsonParse, users.loginRequired, users.userLoginRequired, users.delete);
    app.route('/api/v1/users/login')
        .post(jsonParse, users.login);
    app.route('/api/v1/users/logout')
        .post(jsonParse, users.logout);


    app.route ('/api/v1/projects')
        .get(jsonParse, projects.getAllProjects)
        .post (jsonParse, users.loginRequired, projects.createProject);
    app.route ('/api/v1/projects/:projectId')
        .get(jsonParse, projects.getProjectById)
        .put(jsonParse, users.loginRequired, users.projectLoginRequired, projects.updateProject);
    app.route('/api/v1/projects/:projectId/image')
        .get(jsonParse, projects.getImage)
        .put(upload.single('img'), users.loginRequired, users.projectLoginRequired, projects.updateImage);
    app.route('/api/v1/projects/:projectId/pledge')
        .post(jsonParse, users.loginRequired, users.noProjectLogin, projects.pledge);

    app.route('/api/v1/projects/:projectId/rewards')
        .get(jsonParse, projects.getRewards)
        .put(jsonParse, users.loginRequired, users.projectLoginRequired, projects.createReward);

  };