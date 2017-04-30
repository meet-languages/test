var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');    
var db = mongojs("mongodb://localhost/mydb", ['users']);
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

var app = express();

//View Engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*

app.set('superSecret', 'sadwdasd1ss2312wsd'); // secret variable

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.post('/authenticate', function(req, res) {
  // find the user
  db.users.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn : 60*60*24
        });

        let content = {
            user: user,
            success: true,
            message: 'You logged in',
            token: token
            };
        res.redirect('http://localhost:3000/template');

      }   

    }

  });
});


// route middleware to verify a token
router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});


router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


*/

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
    console.log(req.body);
    db.users.findAndModify({
        query: { _id: mongojs.ObjectId(req.params.id) },
        update: { $set: { name: req.body.name, 
                          email: req.body.email,
                          birthday: req.body.birthday,
                          country: req.body.country,
                          nat_lang: req.body.nat_lang ,
                          lang_learn: req.body.lang_learn ,
                          password: req.body.password ,
                          description: req.body.description ,
                          skype: req.body.skype ,
                          sex: req.body.sex,
                          occupation: req.body.occupation ,
                          email: req.body.email,
                          literature: req.body.literature,
                          music: req.body.music,
                          films: req.body.films,
                          series: req.body.series,
                          activities: req.body.activities,
                          sports: req.body.sports,
                              }  },
        new: true
    }, function (err, doc, lastErrorObject) {
        console.log(doc);
        // doc.tag === 'maintainer' 
    })
})
app.use('/api', router);
module.exports = router;