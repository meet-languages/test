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
require("rxjs/add/operator/map");
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.base_url = 'http://localhost:4000/api';
        this.userSource = new Subject_1.Subject();
        this.user$ = this.userSource.asObservable();
    }
    AuthService.prototype.setUser = function (user) {
        this.userSource.next(user);
    };
    AuthService.prototype.registerUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.base_url + "/register", body, options).map(function (res) { return _this.setToken(res); });
    };
    AuthService.prototype.loginUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.base_url + "/authenticate", body, options).map(function (res) { return _this.setToken(res); });
    };
    AuthService.prototype.logout = function () {
        this.token = null;
        localStorage.removeItem('currentUser');
    };
    AuthService.prototype.verify = function () {
        var _this = this;
        var currUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = (currUser && 'token' in currUser) ? currUser.token : this.token;
        var headers = new http_1.Headers({ 'x-access-token': token });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.get(this.base_url + "/check-state", options).map(function (res) { return _this.parseRes(res); });
    };
    AuthService.prototype.setToken = function (res) {
        var body = JSON.parse(res['_body']);
        if (body['success'] == true) {
            this.token = body['token'];
            localStorage.setItem('currentUser', JSON.stringify({
                email: body['user']['email'],
                token: this.token
            }));
        }
        return body;
    };
    AuthService.prototype.parseRes = function (res) {
        var body = JSON.parse(res['_body']);
        return body;
    };
    return AuthService;
}());
AuthService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map