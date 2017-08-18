const  projects  =  require ('../controllers/project.server.controller');
module.exports  =  function(app) {
    app.route ('/api/v1/projects')
        .get(projects.getAllProjects)
        .post (projects.createProject);
    app.route ('/api/v1/projects/:projectId')
        .get(projects.projectById)
        .put(projects.updateProject);
    app.route('/api/v1/projects/:projectId/image')
        .get(projects.getImage)
        .put(projects.updateImage);
    app.route('/api/v1/projects/:projectId/pledge')
        .post(projects.pledge);
};