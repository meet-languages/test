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
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var UserService = (function () {
    /**
     * Constructor que reclama dependencias inyectables
     * Http se encuentra por haberse registrado en este módulo o en uno superior
     **/
    function UserService(http) {
        this.http = http;
        this.usersUrl = 'http://localhost:4000/api/users'; // URL to web api
        this.userUrl = 'http://localhost:4000/api/user'; // URL to web api
        this.userUpdateUrl = 'http://localhost:4000/update-user'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        // su función es únicamente recibir las dependencias
    }
    UserService.prototype.getUsers = function () {
        return this.http.get(this.usersUrl)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        console.log("Voy a coger el usuario con: " + (this.userUrl + "/" + id));
        var url = this.userUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.update = function (user) {
        var id = "";
        var url = this.userUrl + "/" + user["_id"];
        return this.http
            .put(url, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function () { return user; })
            .catch(this.handleError);
    };
    UserService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map