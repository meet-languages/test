
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
var fs = require('fs');
db.bind('meetings');

var service = {};

service.upload = upload;

module.exports = service;

function upload(req) {
    var deferred = Q.defer();
    console.log(req.files);
    console.log(req.params);
    console.log(req.body);
    /* profileImage is the name of the field in the HTML form */
    fs.readFile(req.body.profilePicture.path, function(err, data) {
      var newPath = __dirname + "/uploads/"+req.files.profileImage.name;
      fs.writeFile(newPath, data, function(err){
        deffered.reject(err.name + ': ' + err.message);
      });

      deffered.resolve();
    });

    return deferred.promise;
}
