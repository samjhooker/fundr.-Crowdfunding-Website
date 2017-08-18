const  users  =  require ('../controllers/user.server.controller');
const  projects  =  require ('../controllers/project.server.controller');


module.exports  =  function(app) {
    app.route ('/api/v1/users')
        .post (users.create);
    app.route ('/api/v1/users/:userId')
        .get(users.userById)
        .put(users.update)
        .delete(users.delete);
    app.route('/api/v1/users/login')
        .post(users.login);
    app.route('/api/v1/users/logout')
        .post(users.logout);


    app.route ('/api/v1/projects')
        .get(projects.getAllProjects);
        //.post (projects.createProject);
    app.route ('/api/v1/projects/:projectId');
        //.get(projects.projectById)
        //.put(projects.updateProject);
    app.route('/api/v1/projects/:projectId/image');
        //.get(projects.getImage)
        //.put(projects.updateImage);
    app.route('/api/v1/projects/:projectId/pledge');
        //.post(projects.pledge);


  };