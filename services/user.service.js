
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db("mongodb://localhost/mydb", { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.getMyUsers = getMyUsers;
service.getMyFriends = getMyFriends;
service.searchUsers = searchUsers;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(email, password) {
    var deferred = Q.defer();

    db.users.findOne({ email: email }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                email: user.email,
                name: user.name,
                messagesCount: user.messagesCount,
                notifications: user.notifications,
                groups: user.groups,
                friends: user.friends,
                messages: user.messages,
                //Signing a token with 1 hour of expiration:
                token: jwt.sign({ sub: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60), }, 'daslfjhuq2kherdsajkn27483huedf')
            });

        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getMyUsers(_id) {
    var deferred = Q.defer();

    db.users.find({ "groups": _id }).toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });
        // console.log(users);

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getMyFriends(_id) {
    var deferred = Q.defer();

    db.users.find({ "friends": _id }).toArray(function (err, friends) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(friends, function (user) {
            return _.omit(user, 'hash');
        });
        // console.log(users);

        deferred.resolve(users);
    });

    return deferred.promise;
}

function searchUsers(userParam) {
    var deferred = Q.defer();
    db.users.find(
        userParam
        ).toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });
        // console.log(users);

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getByName(term) {
    var deferred = Q.defer();

    db.users.findOne({ name: term }).toArray(function (err, users) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        }

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });
        // console.log(users);

        deferred.resolve(users);
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();
    db.users.findById(_id, function (err, user) {

        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}


function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { email: userParam.email },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // email already exists
                deferred.reject('Email "' + userParam.email + '" is already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function update(_id, userParam) {
    var deferred = Q.defer();
    // validation
    db.users.findById(_id, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user.email !== userParam.email) {
            // email has changed so check if the new email is already taken
            db.users.findOne(
                {
                    name: userParam.name,
                    email: userParam.email,
                    birthday: userParam.birthday,
                    country: userParam.country,
                    nat_lang: userParam.nat_lang,
                    lang_learn: userParam.lang_learn,
                    password: userParam.password,
                    description: userParam.description,
                    skype: userParam.skype,
                    sex: userParam.sex,
                    occupation: userParam.occupation,
                    email: userParam.email,
                    literature: userParam.literature,
                    music: userParam.music,
                    films: userParam.films,
                    series: userParam.series,
                    activities: userParam.activities,
                    sports: userParam.sports,
                    groups: userParam.groups,
                    friends: userParam.friends,
                    messages: userParam.messages,

                },
                function (err, user) {
                    if (err) deferred.reject(err.name + ': ' + err.message);

                    if (user) {
                        // email already exists
                        deferred.reject('email "' + req.body.email + '" is already taken')
                    } else {
                        updateUser();
                    }
                });
        } else {
            updateUser();
        }
    });

    function updateUser() {
        // fields to update
        var set = {
            name: userParam.name,
            email: userParam.email,
            birthday: userParam.birthday,
            country: userParam.country,
            nat_lang: userParam.nat_lang,
            lang_learn: userParam.lang_learn,
            password: userParam.password,
            description: userParam.description,
            messagesCount: userParam.messagesCount,
            skype: userParam.skype,
            sex: userParam.sex,
            occupation: userParam.occupation,
            email: userParam.email,
            literature: userParam.literature,
            music: userParam.music,
            films: userParam.films,
            series: userParam.series,
            activities: userParam.activities,
            sports: userParam.sports,
            groups: userParam.groups,
            friends: userParam.friends,
            messages: userParam.messages,
        };

        // update password if it was entered
        if (userParam.password) {
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }

        db.users.update(
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

    db.users.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}