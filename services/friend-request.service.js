var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('friendRequest');

var service = {};

service.create = create;
service.delete = _delete;
service.getMyFriendRequest = getMyFriendRequest;
service.getSentFriendRequest = getSentFriendRequest;

module.exports = service;

function create(friendRequestParam) {
    var deferred = Q.defer();
    var friendRequest = _.omit(friendRequestParam);
    db.friendRequest.insert(
        friendRequest,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.friendRequest.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function getMyFriendRequest(_id) {
    var deferred = Q.defer();

    db.friendRequest.find({ "to": _id}).toArray(function (err, friendRequests) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return messages (without hashed passwords)
        friendRequests = _.map(friendRequests, function (friendRequest) {
            return _.omit(friendRequest, 'hash');
        });

        deferred.resolve(friendRequests);
    });

    return deferred.promise;
}

function getSentFriendRequest(_id) {
    var deferred = Q.defer();
    
    db.friendRequest.find({ "from": _id}).toArray(function (err, friendRequests) {

        if (err) deferred.reject(err.name + ': ' + err.message);
        // return messages (without hashed passwords)
        friendRequests = _.map(friendRequests, function (friendRequest) {
            return _.omit(friendRequest, 'hash');
        });

        deferred.resolve(friendRequests);
    });

    return deferred.promise;
}