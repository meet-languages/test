var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs("mongodb://localhost/mydb", ['users']);

var app = express();

// Get All Users
router.get('/users', function(req, res, next){
    db.users.find(function(err, users){
        if(err){
            res.send(err);
        }
        res.json(users);
    });
});

// Get Single User
router.get('/user/:id', function(req, res, next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, user){
        if(err){
            res.send(err);
        }
        res.json(user);
    });
});


// Esta cogiendo mal los parametros
router.put('/user/:id', function(req, res, next){
    console.log(req.headers);
    db.users.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: { $set: { name: req.body.name, 
                          email: req.body.email,
                          nat_lang: req.body.nat_lang ,
                          lang_learn: req.body.lang_learn ,
                          password: req.body.password ,
                          description: req.body.description ,
                          skype: req.body.skype ,
                          ocupation: req.body.ocupation ,
                          email: req.body.email  }  },
        new: true
    }, function (err, doc, lastErrorObject) {
        console.log(doc);
        // doc.tag === 'maintainer' 
    })
})

module.exports = router;