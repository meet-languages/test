var express = require('express');
var router = express.Router();
var friendRequestService = require('services/friend-request.service.js');
 
// routes
router.post('/register', register);
router.get('/my-friend-request/:_id', getMyFriendRequest);
router.get('/sent-friend-request/:_id', getSentFriendRequest);
router.delete('/:_id', _delete);
 
module.exports = router;
 
function register(req, res) {
    friendRequestService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    friendRequestService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getMyFriendRequest(req, res) {
    friendRequestService.getMyFriendRequest(req.params._id)
        .then(function (friendRequest) {
            if (friendRequest) {
                res.send(friendRequest);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getSentFriendRequest(req, res) {
    friendRequestService.getSentFriendRequest(req.params._id)
        .then(function (friendRequest) {
            if (friendRequest) {
                res.send(friendRequest);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

