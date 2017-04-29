var express = require("express");

// El objeto router nos permite crear rutas modulares
var router = express.Router();

/* app.com/app/ SOLO USUARIOS REGISTRADOS */

router.get("/", function(req, res){
  /* Buscar el usuario */
  res.render("app/home");
})

// Permite exportar objetos
module.exports = router;
