
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('messages');

var service = {};

service.getAll = getAll;
service.create = create;
service.delete = _delete;
service.update = update;
service.getMyMessages = getMyMessages;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.messages.find().toArray(function (err, messages) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return messages (without hashed passwords)
        messages = _.map(messages, function (message) {
            return _.omit(message, 'hash');
        });

        deferred.resolve(messages);
    });

    return deferred.promise;
}

function create(messageParam) {
    var deferred = Q.defer();
    var message = _.omit(messageParam);
    db.messages.insert(
        message,
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.messages.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}

function update(_id, messageParam) {
    var deferred = Q.defer();
    // validation
    
        // fields to update
        var set = {
            messages: messageParam.messages
        };

        db.messages.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

function getMyMessages(_id) {
    var deferred = Q.defer();

    db.messages.find({ $or: [{ "from": _id}, { "to": _id}]}).toArray(function (err, messages) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return messages (without hashed passwords)
        messages = _.map(messages, function (message) {
            return _.omit(message, 'hash');
        });

        deferred.resolve(messages);
    });

    return deferred.promise;
}