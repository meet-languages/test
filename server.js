

require('rootpath')();
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// use JWT auth to secure the api
app.use(expressJwt({ secret: 'daslfjhuq2kherdsajkn27483huedf' }).unless({ path: ['/users/authenticate', '/users/register'] }));
 
// routes
app.use('/users', require('./controllers/users.controller'));
app.use('/groups', require('./controllers/groups.controller'));
app.use('/meetings', require('./controllers/meetings.controller'));
app.use('/messages', require('./controllers/messages.controller'));
 
// start server
var port = process.env.NODE_ENV === 'production' ? 80 : 4000;
var server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});