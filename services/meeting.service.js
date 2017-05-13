
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('meetings');

var service = {};

service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function getAll() {
    var deferred = Q.defer();

    db.meetings.find().toArray(function (err, meetings) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return meetings (without hashed passwords)
        meetings = _.map(meetings, function (meeting) {
            return _.omit(meeting, 'hash');
        });

        deferred.resolve(meetings);
    });

    return deferred.promise;
}


function getById(_id) {
    var deferred = Q.defer();
    db.meetings.findById(_id, function (err, meeting) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        if (meeting) {
            // return meeting(without hashed password)
            deferred.resolve(_.omit(meeting, 'hash'));
        } else {
            // meetingnot found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function create(meetingParam) {
    var deferred = Q.defer();
    console.log(meetingParam);

    // validation
    db.meetings.findOne(
        { title: meetingParam.title },
        function (err, meeting) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (meeting) {
                // email already exists
                deferred.reject('Title "' + meetingParam.title + '" is already taken');
            } else {
                createMeeting();
            }
        });

    function createMeeting() {
        // set meetingobject to meetingParam without the cleartext password
        var meeting = _.omit(meetingParam);

        // add hashed password to meetingobject
        // meeting.hash = bcrypt.hashSync(meetingParam.password, 10);

        db.meetings.insert(
            meeting,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, meetingParam) {
    var deferred = Q.defer();
    console.log(meetingParam);

    // validation
    db.meetings.findById(_id, function (err, meeting) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (meeting.title !== meetingParam.title) {
            // email has changed so check if the new email is already taken
            db.meetings.findOne(
                {
                    title: meetingParam.title,
                },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (meeting) {
                        // email already exists
                        deferred.reject('title "' + req.body.title + '" is already taken')
                    } else {
                        updateMeeting();
                    }
                });
        } else {
            updateMeeting();
        }
    });

    function updateMeeting() {
        // fields to update
        var set = {
            title: meetingParam.title,
            description: meetingParam.description,
            likes: meetingParam.likes
        };

        // update password if it was entered
        // if (userParam.password) {
        //     set.hash = bcrypt.hashSync(userParam.password, 10);
        // }

        db.meetings.update(
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

    db.meetings.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}