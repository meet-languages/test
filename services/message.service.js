var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('messages');

var service = {};

service.create = create;
service.delete = _delete;

module.exports = service;

/*function getMyMessages(_id) {
    var deferred = Q.defer();

    db.messages.find({ "users": _id }).toArray(function (err, messages) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return messages (without hashed passwords)
        messages = _.map(messages, function (message) {
            return _.omit(group, 'hash');
        });

        deferred.resolve(messages);
    });

    return deferred.promise;
}*/

function create(messageParam) {
    var deferred = Q.defer();
     console.log(messageParam);

    function createMessage() {
        var message = _.omit(messageParam);

        db.messages.insert(
            message,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    console.log("iiiin");
    var deferred = Q.defer();

    db.groups.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}