
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('groups');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.getMyGroups = getMyGroups;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.groups.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return groups (without hashed passwords)
        groups = _.map(groups, function (group) {
            return _.omit(group, 'hash');
        });

        deferred.resolve(groups);
    });

    return deferred.promise;
}

function getMyGroups(_id) {
    var deferred = Q.defer();

    db.groups.find({ "users": _id }).toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return groups (without hashed passwords)
        groups = _.map(groups, function (group) {
            return _.omit(group, 'hash');
        });
        console.log(groups);

        deferred.resolve(groups);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    db.groups.findById(_id, function (err, group) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        if (group) {
            // return group(without hashed password)
            deferred.resolve(_.omit(group, 'hash'));
        } else {
            // groupnot found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function create(groupParam) {
    var deferred = Q.defer();
    console.log(groupParam);

    // validation
    db.groups.findOne(
        { title: groupParam.title },
        function (err, group) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (group) {
                // email already exists
                deferred.reject('Title "' + groupParam.title + '" is already taken');
            } else {
                createGroup();
            }
        });

    function createGroup() {
        // set groupobject to groupParam without the cleartext password
        var group = _.omit(groupParam);

        // add hashed password to groupobject
        // group.hash = bcrypt.hashSync(groupParam.password, 10);

        db.groups.insert(
            group,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, groupParam) {
    var deferred = Q.defer();
    console.log(groupParam);

    // validation
    db.groups.findById(_id, function (err, group) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (group.title !== groupParam.title) {
            // email has changed so check if the new email is already taken
            db.groups.findOne(
                {
                    title: groupParam.title,
                },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (group) {
                        // email already exists
                        deferred.reject('title "' + req.body.title + '" is already taken')
                    } else {
                        updateGroup();
                    }
                });
        } else {
            updateGroup();
        }
    });

    function updateGroup() {
        // fields to update
        var set = {
            title: groupParam.title,
            type: groupParam.type,
            description: groupParam.description,
            users: groupParam.users,
        };

        // update password if it was entered
        // if (userParam.password) {
        //     set.hash = bcrypt.hashSync(userParam.password, 10);
        // }

        db.groups.update(
            { _id: mongo.helper.toObjectID(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.groups.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}