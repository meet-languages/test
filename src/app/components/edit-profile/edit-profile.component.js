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
require("rxjs/add/operator/switchMap");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_service_1 = require("../../_services/user.service");
var EditProfileComponent = (function () {
    function EditProfileComponent(userService, router, route, location) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.lang_values = ["Afrikanns", "Albanian", "Arabic", "Armenian", "Basque", "Bengali", "Bulgarian", "Catalan", "Cambodian", "Chinese (Mandarin)", "Croation", "Czech", "Danish", "Dutch", "English", "Estonian", "Fiji", "Finnish", "French", "Georgian", "German", "Greek", "Gujarati", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian", "Irish", "Italian", "Japanese", "Javanese", "Korean", "Latin", "Latvian", "Lithuanian", "Macedonian", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Mongolian", "Nepali", "Norwegian", "Persian", "Polish", "Portuguese", "Punjabi", "Quechua", "Romanian", "Russian", "Samoan", "Serbian", "Slovak", "Slovenian", "Spanish", "Swahili", "Swedish ", "Tamil", "Tatar", "Telugu", "Thai", "Tibetan", "Tonga", "Turkish", "Ukranian", "Urdu", "Uzbek", "Vietnamese", "Welsh", "Xhosa"];
        this.country_values = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "AntiguaandBarbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "BosniaandHerzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "BurkinaFaso", "Burundi", "Cambodia", "Cameroon", "Canada", "CapeVerde", "CentralAfricanRepublic", "Chad", "Chile", "China", "Colombi", "Comoros", "Congo(Brazzaville)", "Congo", "CostaRica", "Coted'Ivoire", "Croatia", "Cuba", "Cyprus", "CzechRepublic", "Denmark", "Djibouti", "Dominica", "DominicanRepublic", "EastTimor(TimorTimur)", "Ecuador", "Egypt", "ElSalvador", "EquatorialGuinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia,The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea,North", "Korea,South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "MarshallIslands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "NewZealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "PapuaNewGuinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "SaintKittsandNevis", "SaintLucia", "SaintVincent", "Samoa", "SanMarino", "SaoTomeandPrincipe", "SaudiArabia", "Senegal", "SerbiaandMontenegro", "Seychelles", "SierraLeone", "Singapore", "Slovakia", "Slovenia", "SolomonIslands", "Somalia", "SouthAfrica", "Spain", "SriLanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "TrinidadandTobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "UnitedArabEmirates", "UnitedKingdom", "UnitedStates", "Uruguay", "Uzbekistan", "Vanuatu", "VaticanCity", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];
        this.occupation_values = ["Student", "Worker", "Retired", "Others"];
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    EditProfileComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.loadUser();
    };
    EditProfileComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
        console.log(this.users);
    };
    EditProfileComponent.prototype.loadUser = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getById(params["id"]); })
            .subscribe(function (user) { return _this.user = user; });
    };
    EditProfileComponent.prototype.save = function () {
        var _this = this;
        this.userService.update(this.user).subscribe(function () { _this.loadUser(); });
        var id = "_id";
        this.router.navigate(['/template/my-profile', this.currentUser["_id"]]);
    };
    EditProfileComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/profile', this.user[id]]);
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    core_1.Component({
        selector: 'edit-profile',
        templateUrl: './edit-profile.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], EditProfileComponent);
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map