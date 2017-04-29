var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var user = require('./routes/user');
var User = require("./models/User").User; // Schema del user para la BD
var session = require("express-session"); // Para establecer sesiones de usuario
var routes_app = require("./routes_app");
var session_middleware = require("./middlewares/session");

var port = 4000;

var app = express();

// app.set('title', 'My Site');
// app.get('title'); // "My Site"

//View Engine
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'src')));
console.log(path.join(__dirname, '/'));

// Headers
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Body Parser MW
// Decodifica la informacion recibida por el servidor cliente,
// y lo expone en cada una de las request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    // secret tiene que ser unico
    secret: "123u1kh23ku1",
    // resave: significa que la sesion se vuelve a guardar aunque no se haya modificado
    // Como cuando dos usuarios acceden a la misma sesion al mismo tiempo
    resave: false,
    saveUninitialized: false
}));

app.get("/", function(req, res) {
    console.log(req.session.user_id);
    res.render("index");
});
//
// app.get("/singup", function(req, res) {
//     // find va a la base de datos y busca
//     // si no viene nulo, doc almacena todo
//     User.find(function(err, doc) {
//         console.log(doc);
//         // req.body contiene los parametros
//         res.render("singup");
//     });
// });
//
// app.get("/login", function(req, res) {
//     res.render("login");
//     User.find(function(err, doc) {
//         console.log(doc);
//         // req.body contiene los parametros
//         res.render("singup");
//     });
// });

app.post("/users", function(req, res) {
    // Guardamos el usuario en un buffer
    var user = new User({
        name: req.body.name,
        nat_lang: req.body.nat_lang,
        lang_learn: req.body.lang_learn,
        email: req.body.email,
        skype: req.body.skype,
        description: req.body.description,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation
    });
    console.log(user);

    // En este punto se guardan los datos en la bd, realizando las validaciones
    // Save recibe como parametro un callback, save es asincrono
    // El callback recibe 3 parametros: el error, el documento, el num de filas afectadas
    // user.save(function(err, user, num) {
    //     if (err) {
    //         console.log(String(err));
    //     }
    //     res.send("Hemos guardamos tus datos.");
    // });

    // Guardado en la bd mediante promisses
    user.save().then(function(user) {

            if (!req.body.email || !req.body.password) {

            } else {
                User.findOne({
                    email: req.body.email,
                    password: req.body.password
                }, /*"username email",*/ function(err, user) {
                    // Guardamos la session del usuario con session
                    if (user) {
                        req.session.user_id = user._id;
                        res.redirect("http://localhost:3000/profile/"+req.session.user_id);
                    } else {
                        res.send("Cuenta invalida");
                    }
                });
            };
        }),
        function(err) {
            if (err) {
                console.log(String(err));
                res.send("No pudimos guardar la informacion.");
            }
        }
})

app.post("/sessions", function(req, res) {
    User.find(function(err, doc) {
    });

    // findById: busca por id
    // find: devuelve una coleccion, un array de documentos que cumplen la condicion
    // findOne: solo obtiene un documento
    if (!req.body.email || !req.body.password) {

    } else {
        User.findOne({
            email: req.body.email,
            password: req.body.password
        }, /*"username email",*/ function(err, user) {
            // Guardamos la session del usuario con session
            if (user) {
                req.session.user_id = user._id;
                // console.log("\n\n\n"+req.session.user_id);
                res.redirect("http://localhost:3000/profile/"+req.session.user_id);
            } else {
                res.send("Cuenta invalida");
            }
        });
    };
});


app.use("/app", session_middleware);
app.use("/app", routes_app);

app.use('/', index);
app.use('/api', user);

app.listen(port, function(){
    console.log('Server started on port '+port);
});
