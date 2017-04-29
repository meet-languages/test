"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// services/auth.service.ts
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var AuthService = (function () {
    function AuthService() {
        // Configure Auth0
        this.lock = new Auth0Lock('WE1B9tgLAiYURX5SwMNNZbST3suaY6ue', 'meetlanguages.eu.auth0.com', {});
    }
    AuthService.prototype.login = function () {
        this.lock.show(function (error, profile, id_token) {
            if (error) {
                console.log(error);
            }
            // We get a profile object for the user from Auth0
            localStorage.setItem('profile', JSON.stringify(profile));
            // We also get the user's JWT
            localStorage.setItem('id_token', id_token);
        });
    };
    AuthService.prototype.logout = function () {
        // To log out, we just need to remove
        // the user's profile and token
        localStorage.removeItem('profile');
        localStorage.removeItem('id_token');
    };
    AuthService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map