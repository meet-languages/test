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
var app_config_1 = require("../app.config");
var FriendRequestService = (function () {
    function FriendRequestService(http, config) {
        this.http = http;
        this.config = config;
    }
    FriendRequestService.prototype.create = function (friendRequest) {
        return this.http.post(this.config.apiUrl + '/friend-request/register', friendRequest, this.jwt());
    };
    FriendRequestService.prototype.delete = function (_id) {
        return this.http.delete(this.config.apiUrl + '/friend-request/' + _id, this.jwt());
    };
    FriendRequestService.prototype.getMyFriendRequest = function (_id) {
        return this.http.get(this.config.apiUrl + '/friend-request/my-friend-request/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    FriendRequestService.prototype.getSentFriendRequest = function (_id) {
        return this.http.get(this.config.apiUrl + '/friend-request/sent-friend-request/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    // private helper methods
    FriendRequestService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return FriendRequestService;
}());
FriendRequestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
], FriendRequestService);
exports.FriendRequestService = FriendRequestService;
//# sourceMappingURL=friend-request.service.js.map