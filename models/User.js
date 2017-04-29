// Modelo para almacenar en la base de datos

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mydb");

var sex_values = ["M", "F"];
var occupation_values = ["Student", "Worker", "Retired", "Others"];
var email_match = [/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/, "Email invalido"];
var lang_values = ["Afrikanns","Albanian","Arabic","Armenian","Basque","Bengali","Bulgarian","Catalan","Cambodian","Chinese (Mandarin)","Croation","Czech","Danish","Dutch","English","Estonian","Fiji","Finnish","French","Georgian","German","Greek","Gujarati","Hebrew","Hindi","Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Javanese","Korean","Latin","Latvian","Lithuanian","Macedonian","Malay","Malayalam","Maltese","Maori","Marathi","Mongolian","Nepali","Norwegian","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Serbian","Slovak","Slovenian","Spanish","Swahili","Swedish ","Tamil","Tatar","Telugu","Thai","Tibetan","Tonga","Turkish","Ukranian","Urdu","Uzbek","Vietnamese","Welsh","Xhosa"];
var country_values = ["Afghanistan","Albania","Algeria","Andorra","Angola","AntiguaandBarbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","BosniaandHerzegovina","Botswana","Brazil","Brunei","Bulgaria","BurkinaFaso","Burundi","Cambodia","Cameroon","Canada","CapeVerde","CentralAfricanRepublic","Chad","Chile","China","Colombi","Comoros","Congo(Brazzaville)","Congo","CostaRica","Coted'Ivoire","Croatia","Cuba","Cyprus","CzechRepublic","Denmark","Djibouti","Dominica","DominicanRepublic","EastTimor(TimorTimur)","Ecuador","Egypt","ElSalvador","EquatorialGuinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia,The","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea,North","Korea,South","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","MarshallIslands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewZealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","SaintKittsandNevis","SaintLucia","SaintVincent","Samoa","SanMarino","SaoTomeandPrincipe","SaudiArabia","Senegal","SerbiaandMontenegro","Seychelles","SierraLeone","Singapore","Slovakia","Slovenia","SolomonIslands","Somalia","SouthAfrica","Spain","SriLanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","TrinidadandTobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","UnitedArabEmirates","UnitedKingdom","UnitedStates","Uruguay","Uzbekistan","Vanuatu","VaticanCity","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

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
        enum: {
            values: lang_values,
            message: "Opcion no valida"
        },
        required: true,
    },
    country: {
        type: String,
        enum: {
            values: country_values,
            message: "Opcion no valida"
        },
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
        enum: {
            values: lang_values,
            message: "Opcion no valida"
        },
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
   birthday: Date,
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
        maxlength: [15, "skype muy largo"],
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
    literature: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Self-help", isChecked: false }, 
            { name: "Tales", isChecked: false }, 
            { name: "Legends", isChecked: false },
            { name: "Religion", isChecked: false }, 
            { name: "Science-fiction", isChecked: false }, 
            { name: "Philosofy", isChecked: false },
            { name: "Novels", isChecked: false }, 
            { name: "Terror", isChecked: false }, 
            { name: "Comic", isChecked: false },
            { name: "Sciences", isChecked: false }, 
            { name: "Poetries", isChecked: false }, 
            { name: "Memories", isChecked: false },
        ],
    },
    music: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Rock", isChecked: false }, 
            { name: "Pop", isChecked: false }, 
            { name: "Reggae", isChecked: false },
            { name: "Ska", isChecked: false }, 
            { name: "Latin", isChecked: false }, 
            { name: "Flamenco", isChecked: false },
            { name: "Trap", isChecked: false }, 
            { name: "Trance", isChecked: false }, 
            { name: "Classical", isChecked: false },
            { name: "Alternative", isChecked: false }, 
            { name: "Blues", isChecked: false }, 
            { name: "Country", isChecked: false }, 
            { name: "Electronic", isChecked: false },
            { name: "Hip Hop / Rap", isChecked: false }, 
            { name: "Cumbia", isChecked: false }, 
            { name: "Salsa", isChecked: false },
            { name: "Dance", isChecked: false }, 
            { name: "Drum and Bass", isChecked: false }, 
            { name: "Dubstep", isChecked: false },
            { name: "Techno", isChecked: false },
            { name: "Instrumental", isChecked: false }, 
            { name: "Jazz", isChecked: false }, 
            { name: "R&B/Soul", isChecked: false },
            { name: "Dance", isChecked: false }, 
            { name: "Drum and Bass", isChecked: false }, 
            { name: "Heavy", isChecked: false },
        ],
    },
     films: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Action", isChecked: false }, 
            { name: "Science Fiction", isChecked: false }, 
            { name: "Drama", isChecked: false },
            { name: "Musical", isChecked: false }, 
            { name: "Romantic", isChecked: false }, 
            { name: "FlameAnimationnco", isChecked: false },
            { name: "Fantasy", isChecked: false }, 
            { name: "Terror", isChecked: false }, 
            { name: "Thriller", isChecked: false },
            { name: "Adventure", isChecked: false }, 
            { name: "Western", isChecked: false }, 
            { name: "Mistery", isChecked: false }, 
            { name: "Police", isChecked: false },
        ],
    },
    series: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Breaking bad", isChecked: false }, 
            { name: "Person of interest", isChecked: false }, 
            { name: "Gotham", isChecked: false },
            { name: "Arrow", isChecked: false }, 
            { name: "Shameles", isChecked: false }, 
            { name: "Game of Thrones", isChecked: false },
            { name: "The walking dead", isChecked: false }, 
            { name: "House", isChecked: false }, 
            { name: "How I met your mother", isChecked: false },
            { name: "Big Bang theory", isChecked: false }, 
            { name: "Flash", isChecked: false }, 
            { name: "Vikings", isChecked: false },
        ],
    },
    activities: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Learn languages", isChecked: false }, 
            { name: "Auto / Motorbike", isChecked: false }, 
            { name: "Science", isChecked: false },
            { name: "Sports", isChecked: false }, 
            { name: "Shopping", isChecked: false }, 
            { name: "Theatre", isChecked: false },
            { name: "Astronomy", isChecked: false }, 
            { name: "Bar / Clubs", isChecked: false }, 
            { name: "Games", isChecked: false },
            { name: "TV", isChecked: false }, 
            { name: "Nature", isChecked: false }, 
            { name: "Meet friends", isChecked: false }, 
            { name: "Cooking", isChecked: false },
            { name: "Museums / Exhibits", isChecked: false }, 
            { name: "Music", isChecked: false }, 
            { name: "Travels", isChecked: false },
            { name: "Astrology", isChecked: false }, 
            { name: "Dance", isChecked: false }, 
            { name: "Movies", isChecked: false },
            { name: "Internet", isChecked: false },
            { name: "Crafts", isChecked: false }, 
            { name: "Computers", isChecked: false }, 
            { name: "Technology", isChecked: false },
            { name: "Reading", isChecked: false }, 
            { name: "Cooking", isChecked: false }, 
        ],
    },
    sports: {
        type: [Schema.Types.Mixed],
        default: [
            { name: "Martial arts", isChecked: false }, 
            { name: "Athletics", isChecked: false }, 
            { name: "Motoring", isChecked: false },
            { name: "Badminton", isChecked: false }, 
            { name: "Golf", isChecked: false }, 
            { name: "Handball", isChecked: false },
            { name: "Hockey", isChecked: false }, 
            { name: "Cycling", isChecked: false }, 
            { name: "Extreme Sports", isChecked: false },
            { name: "Riding", isChecked: false }, 
            { name: "Skiing", isChecked: false }, 
            { name: "Dance", isChecked: false }, 
            { name: "Basket", isChecked: false },
            { name: "Baseball", isChecked: false }, 
            { name: "Billiards", isChecked: false }, 
            { name: "Swimming", isChecked: false },
            { name: "Navigation", isChecked: false }, 
            { name: "Skate", isChecked: false }, 
            { name: "Table tennis", isChecked: false },
            { name: "Volleyball", isChecked: false },
            { name: "Yoga", isChecked: false }, 
            { name: "Soccer", isChecked: false }, 
            { name: "Water-skiing", isChecked: false },
            { name: "Boxing", isChecked: false }, 
            { name: "Diving", isChecked: false }, 
            { name: "Hike", isChecked: false },
            { name: "Hunting", isChecked: false }, 
            { name: "Squash", isChecked: false }, 
            { name: "Surf", isChecked: false },
            { name: "Tennis", isChecked: false },
            { name: "Football", isChecked: false }, 
            { name: "Gymnastics", isChecked: false }, 
            { name: "Gym", isChecked: false },
            { name: "BMX", isChecked: false }, 
            { name: "Others", isChecked: false }, 
        ],
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
