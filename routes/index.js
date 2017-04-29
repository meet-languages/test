var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('src/app/index.html');
});

module.exports = router;