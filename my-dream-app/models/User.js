// Modelo para almacenar en la base de datos

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mydb");

var sex_values = ["M", "F", null];
var occupation_values = ["Student", "Worker", "Retired", "Others", null];
var email_match = [/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/, "Email invalido"];

var password_validation = {
    validator: function(pass) {
        //this. hace referencia al documento que estamos pasando
        return this.password_confirmation == pass;
    },
    message: "Las contraseñas no coinciden"
};

// Schema es una clase de mongoose, seria como una tabla en una relacional
var user_schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: [15, "Nombre muy largo"]
    },
    nat_lang: {
        type: String,
        required: true,
        maxlength: [15, "Lenguaje muy largo"]
    },
    country: {
        type: String,
        maxlength: [15, "country muy largo"],
        default: null
    },
    skype: {
        type: String,
        maxlength: [15, "skype muy largo"],
        default: null
    },
    occupation: {
        type: String,
        enum: {
            values: occupation_values,
            message: "Opcion no valida"
        },
        default: null
    },
    lang_learn: {
        type: String,
        maxlength: [15, "Lenguaje muy largo"]
    },
    username: {
        type: String,
        default: null
    },
    password: {
        type: String,
        minlength: [8, "Password muy corto"],
        validate: password_validation
    },
    age: {
        type: Number,
        min: [10, "La edad no puede ser menor que 10"],
        max: [100, "la edad no puede ser mayor de 100"],
        default: null
    },
    email: {
        type: String,
        required: "Necesitas rellenar el email.",
        match: email_match
    },
    date_of_birthday: Date,
    // Para el enum el mensaje se define de forma diferente
    sex: {
        type: String,
        enum: {
            values: sex_values,
            message: "Opcion no valida"
        },
        default: null
    },
    
    skype: {
        type: String,
        maxlength: [15, "country muy largo"],
        default: null
    },
    
    description: {
        type: String,
        default: null
    },

    notifications: {
        type: Number,
        min: [0, "No puede ser menor que 10"],
        max: [100, "No puede ser mayor de 100"],
        default: 0
    },
    

    messages: {
        type: Number,
        min: [0, "No puede ser menor que 10"],
        max: [100, "No puede ser mayor de 100"],
        default: 0  
    },
});

user_schema.virtual("password_confirmation").get(function() {
    return this.pass_conf;
}).set(function(password) {
    this.pass_conf = password;
});

// user_schema.virtual("full_name").get(function(){
//   return this.first_name + this.last_name;
// }).set(function(full_name){
//   this.password_confirmation = full_name;
// });

// Colecciones  => Tablas
// Documentos   => Filas son instancias de una coleccion

/*
TIPOS DE DATOS DE MONGODB
 String
 Number
 Date
 Buffer
 Boolean
 Mixed
 Objectid
 Array
*/

// Toda la comunicacion con la base de datos se realiza con modelos
// .mode genera los modelos (nombredelmodelo, esquema)
var User = mongoose.model("User", user_schema);
// console.log(User);

// Podemos exportar cualquier cosa
module.exports.User = User;
