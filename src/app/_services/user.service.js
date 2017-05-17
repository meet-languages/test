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
var http_1 = require("@angular/http");
var Subject_1 = require("rxjs/Subject");
var app_config_1 = require("../app.config");
var UserService = (function () {
    function UserService(http, config) {
        this.http = http;
        this.config = config;
        this.subject = new Subject_1.Subject();
    }
    UserService.prototype.getAll = function () {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getMyUsers = function (_id) {
        return this.http.get(this.config.apiUrl + '/users/my-users/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.searchUsers = function (user) {
        return this.http.get(this.config.apiUrl + '/users/search-users/' + JSON.stringify(user), this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.getById = function (_id) {
        return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    UserService.prototype.create = function (user) {
        return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
    };
    UserService.prototype.update = function (user) {
        return this.http.put(this.config.apiUrl + '/users/' + user["_id"], user, this.jwt());
    };
    UserService.prototype.delete = function (_id) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    };
    UserService.prototype.getData = function () {
        return this.subject.asObservable();
    };
    UserService.prototype.setData = function (usersSearch) {
        this.usersSearch = usersSearch;
        this.subject.next(usersSearch);
    };
    // private helper methods
    UserService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map