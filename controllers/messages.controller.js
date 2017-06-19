var express = require('express');
var router = express.Router();
var messageService = require('services/message.service.js');
 
// routes
router.post('/register', register);
router.get('/', getAll);
router.get('/my-messages/:_id', getMyMessages);
router.put('/:_id', update);
router.delete('/:_id', _delete);
 
module.exports = router;
 
function register(req, res) {
    messageService.create(req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function getAll(req, res) {
    messageService.getAll()
        .then(function (messages) {
            res.send(messages);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    messageService.delete(req.params._id)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    messageService.update(req.params._id, req.body)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getMyMessages(req, res) {
    messageService.getMyMessages(req.params._id)
        .then(function (message) {
            if (message) {
                res.send(message);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

