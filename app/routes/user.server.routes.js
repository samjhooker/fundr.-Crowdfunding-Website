const  users  =  require ('../controllers/user.server.controller');
const  projects  =  require ('../controllers/project.server.controller');
const  bodyParser = require('body-parser');



const jsonParse  = bodyParser.json({
        extended: true
    });

// const imgParse  = bodyParser.urlencoded({
//     limit: '50mb',
//     extended: true,
//     parameterLimit: 1000000
// });

let multer = require('multer');
var storage = multer.memoryStorage()
let upload = multer({storage:storage});


module.exports  =  function(app) {
    app.route ('/api/v1/users')
        .post (jsonParse, users.create);
    app.route ('/api/v1/users/:userId')
        .get(jsonParse, users.userById)
        .put(jsonParse, users.update)
        .delete(jsonParse, users.delete);
    app.route('/api/v1/users/login')
        .post(jsonParse, users.login);
    app.route('/api/v1/users/logout')
        .post(jsonParse, users.logout);


    app.route ('/api/v1/projects')
        .get(jsonParse, projects.getAllProjects)
        .post (jsonParse, projects.createProject);
    app.route ('/api/v1/projects/:projectId')
        .get(jsonParse, projects.getProjectById)
        .put(jsonParse, projects.updateProject);

    app.route('/api/v1/projects/:projectId/image')
        //.get(jsonParse, projects.getImage)
        .put(upload.single('img'), projects.updateImage);

    app.route('/api/v1/projects/:projectId/pledge');
        //.post(jsonParse, projects.pledge);


  };