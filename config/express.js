const express = require('express'),
    bodyParser = require('body-parser');

module.exports = function (){
    const app = express();
    app.use(bodyParser.json ({
        extended:true
    }));
    require('../app/routes/user.server.routes.js')(app);
    return  app;
};