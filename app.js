
const db = require('./config/db');
const express = require('./config/express');

const app = express();

user = null;

db.connect(function(err) {
    if (err) {
      console.log('Unable to connect to MySQL');
      process.exit(1);
    }else {
      app.listen(4941, function() {
          console.log('Listening on port: ' + 4941);
        })

    }

  });