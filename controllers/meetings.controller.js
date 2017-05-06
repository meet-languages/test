
var express = require('express');
var router = express.Router();
var meetingService = require('services/meeting.service.js');
 
// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/:_id', getById);
router.put('/:_id', update);
router.delete('/:_id', _delete);
 
module.exports = router;
 
function register(req, res) {
    meetingService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getAll(req, res) {
    meetingService.getAll()
        .then(function (meetings) {
            res.send(meetings);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function update(req, res) {
    meetingService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function _delete(req, res) {
    meetingService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getById(req, res) {
    meetingService.getById(req.params._id)
        .then(function (meeting) {
            if (meeting) {
                res.send(meeting);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}