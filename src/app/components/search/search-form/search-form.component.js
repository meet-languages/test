"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_service_1 = require("../../../_services/user.service");
var SearchFormComponent = (function () {
    function SearchFormComponent(userService, route, router, location) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.userToSearch = {};
        this.lang_values = ["Afrikanns", "Albanian", "Arabic", "Armenian", "Basque", "Bengali", "Bulgarian", "Catalan", "Cambodian", "Chinese (Mandarin)", "Croation", "Czech", "Danish", "Dutch", "English", "Estonian", "Fiji", "Finnish", "French", "Georgian", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Korean", "Latin", "Latvian", "Lithuanian", "Macedonian", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Nepali", "Norwegian", "Persian", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish ", "Tamil", "Tatar", "Telugu", "Thai", "Tibetan", "Tonga", "Turkish", "Ukranian", "Urdu", "Uzbek", "Vietnamese", "Welsh", "Xhosa"];
        this.country_values = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "AntiguaandBarbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "BosniaandHerzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "BurkinaFaso", "Burundi", "Cambodia", "Cameroon", "Canada", "CapeVerde", "CentralAfricanRepublic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo(Brazzaville)", "Congo", "CostaRica", "Coted'Ivoire", "Croatia", "Cuba", "Cyprus", "CzechRepublic", "Denmark", "Djibouti", "Dominica", "DominicanRepublic", "EastTimor(TimorTimur)", "Ecuador", "Egypt", "ElSalvador", "EquatorialGuinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia,The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea,North", "Korea,South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "MarshallIslands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "NewZealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "PapuaNewGuinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "SaintKittsandNevis", "SaintLucia", "SaintVincent", "Samoa", "SanMarino", "SaoTomeandPrincipe", "SaudiArabia", "Senegal", "SerbiaandMontenegro", "Seychelles", "SierraLeone", "Singapore", "Slovakia", "Slovenia", "SolomonIslands", "Somalia", "SouthAfrica", "Spain", "SriLanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "TrinidadandTobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "UnitedArabEmirates", "UnitedKingdom", "UnitedStates", "Uruguay", "Uzbekistan", "Vanuatu", "VaticanCity", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
        this.occupation_values = ["Student", "Worker", "Retired", "Others"];
        this.literature = [{ "name": "Self-help", "isChecked": false }, { "name": "Tales", "isChecked": false }, { "name": "Legends", "isChecked": false }, { "name": "Religion", "isChecked": false }, { "name": "Science-fiction", "isChecked": false }, { "name": "Philosofy", "isChecked": false }, { "name": "Novels", "isChecked": false }, { "name": "Terror", "isChecked": false }, { "name": "Comic", "isChecked": false }, { "name": "Sciences", "isChecked": false }, { "name": "Poetries", "isChecked": false }, { "name": "Memories", "isChecked": false }];
        this.music = [{ "name": "Rock", "isChecked": false }, { "name": "Pop", "isChecked": false }, { "name": "Reggae", "isChecked": false }, { "name": "Ska", "isChecked": false }, { "name": "Latin", "isChecked": false }, { "name": "Flamenco", "isChecked": false }, { "name": "Trap", "isChecked": false }, { "name": "Trance", "isChecked": false }, { "name": "Classical", "isChecked": false }, { "name": "Alternative", "isChecked": false }, { "name": "Blues", "isChecked": false }, { "name": "Country", "isChecked": false }, { "name": "Electronic", "isChecked": false }, { "name": "Hip Hop / Rap", "isChecked": false }, { "name": "Cumbia", "isChecked": false }, { "name": "Salsa", "isChecked": false }, { "name": "Dance", "isChecked": false }, { "name": "Drum and Bass", "isChecked": false }, { "name": "Dubstep", "isChecked": false }, { "name": "Techno", "isChecked": false }, { "name": "Instrumental", "isChecked": false }, { "name": "Jazz", "isChecked": false }, { "name": "R&B/Soul", "isChecked": false }, { "name": "Dance", "isChecked": false }, { "name": "Drum and Bass", "isChecked": false }, { "name": "Heavy", "isChecked": false }];
        this.films = [{ "name": "Action", "isChecked": false }, { "name": "Science Fiction", "isChecked": false }, { "name": "Drama", "isChecked": false }, { "name": "Musical", "isChecked": false }, { "name": "Romantic", "isChecked": false }, { "name": "FlameAnimationnco", "isChecked": false }, { "name": "Fantasy", "isChecked": false }, { "name": "Terror", "isChecked": false }, { "name": "Thriller", "isChecked": false }, { "name": "Adventure", "isChecked": false }, { "name": "Western", "isChecked": false }, { "name": "Mistery", "isChecked": false }, { "name": "Police", "isChecked": false }];
        this.series = [{ "name": "Breaking bad", "isChecked": false }, { "name": "Person of interest", "isChecked": false }, { "name": "Gotham", "isChecked": false }, { "name": "Arrow", "isChecked": false }, { "name": "Shameles", "isChecked": false }, { "name": "Game of Thrones", "isChecked": false }, { "name": "The walking dead", "isChecked": false }, { "name": "House", "isChecked": false }, { "name": "How I met your mother", "isChecked": false }, { "name": "Big Bang theory", "isChecked": false }, { "name": "Flash", "isChecked": false }, { "name": "Vikings", "isChecked": false }];
        this.activities = [{ "name": "Learn languages", "isChecked": false }, { "name": "Auto / Motorbike", "isChecked": false }, { "name": "Science", "isChecked": false }, { "name": "Sports", "isChecked": false }, { "name": "Shopping", "isChecked": false }, { "name": "Theatre", "isChecked": false }, { "name": "Astronomy", "isChecked": false }, { "name": "Bar / Clubs", "isChecked": false }, { "name": "Games", "isChecked": false }, { "name": "TV", "isChecked": false }, { "name": "Nature", "isChecked": false }, { "name": "Meet friends", "isChecked": false }, { "name": "Cooking", "isChecked": false }, { "name": "Museums / Exhibits", "isChecked": false }, { "name": "Music", "isChecked": false }, { "name": "Travels", "isChecked": false }, { "name": "Astrology", "isChecked": false }, { "name": "Dance", "isChecked": false }, { "name": "Movies", "isChecked": false }, { "name": "Internet", "isChecked": false }, { "name": "Crafts", "isChecked": false }, { "name": "Computers", "isChecked": false }, { "name": "Technology", "isChecked": false }, { "name": "Reading", "isChecked": false }, { "name": "Cooking", "isChecked": false }];
        this.sports = [{ "name": "Martial arts", "isChecked": false }, { "name": "Athletics", "isChecked": false }, { "name": "Motoring", "isChecked": false }, { "name": "Badminton", "isChecked": false }, { "name": "Golf", "isChecked": false }, { "name": "Handball", "isChecked": false }, { "name": "Hockey", "isChecked": false }, { "name": "Cycling", "isChecked": false }, { "name": "Extreme Sports", "isChecked": false }, { "name": "Riding", "isChecked": false }, { "name": "Skiing", "isChecked": false }, { "name": "Dance", "isChecked": false }, { "name": "Basket", "isChecked": false }, { "name": "Baseball", "isChecked": false }, { "name": "Billiards", "isChecked": false }, { "name": "Swimming", "isChecked": false }, { "name": "Navigation", "isChecked": false }, { "name": "Skate", "isChecked": false }, { "name": "Table tennis", "isChecked": false }, { "name": "Volleyball", "isChecked": false }, { "name": "Yoga", "isChecked": false }, { "name": "Soccer", "isChecked": false }, { "name": "Water-skiing", "isChecked": false }, { "name": "Boxing", "isChecked": false }, { "name": "Diving", "isChecked": false }, { "name": "Hike", "isChecked": false }, { "name": "Hunting", "isChecked": false }, { "name": "Squash", "isChecked": false }, { "name": "Surf", "isChecked": false }, { "name": "Tennis", "isChecked": false }, { "name": "Football", "isChecked": false }, { "name": "Gymnastics", "isChecked": false }, { "name": "Gym", "isChecked": false }, { "name": "BMX", "isChecked": false }, { "name": "Others", "isChecked": false }];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    SearchFormComponent.prototype.ngOnInit = function () {
        this.loadUser();
    };
    SearchFormComponent.prototype.searchUsers = function () {
        var _this = this;
        this.userService.searchUsers(this.userToSearch)
            .subscribe(function (users) { _this.users = users; _this.setData(users); });
        this.gotoSearchUsers();
    };
    SearchFormComponent.prototype.loadUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (user) { return _this.user = user; });
    };
    SearchFormComponent.prototype.gotoSearchUsers = function () {
        this.router.navigate(['/template/search/search-users'], "Asdawdasd");
    };
    SearchFormComponent.prototype.setData = function (users) {
        this.userService.setData(this.users);
    };
    return SearchFormComponent;
}());
SearchFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search-form',
        templateUrl: '/app/components/search/search-form/search-form.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=search-form.component.js.map