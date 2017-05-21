
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer')
var uploadm = multer({ dest: 'src/img/profilePics/' })
var imageService = require('services/image.service.js');


// routes
router.post('/upload', uploadm.single('profilePicture'), function(req,res){
  console.log("A upload request has been received.");
  console.log("the filename is "+req.body.userid);
  fs.rename(req.file.path, 'src/img/profilePics/'+req.body.userid, function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });
});

module.exports = router;

function upload(req, res) {
    imageService.upload(req)
        .then(function () {
            res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
