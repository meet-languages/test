var User = require("../models/User").User; // Schema del user para la BD
module.exports = function(req, res, next){
  if (!req.session.user_id) {
    res.redirect("http://localhost:3000/registro.html");
  } else {
    User.findById(req.session.user_id, function(err, user){
      if(err){
        console.log(err);
        res.redirect("http://localhost:3000/registro.html");
      } else {
        // locals fusiona los datos que le ponemos al response, todo esto al pasar por el mw
        res.locals = { user: user };
        next();
      }
    });
  }
}
