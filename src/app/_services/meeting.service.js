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
var MeetingService = (function () {
    function MeetingService(http, config) {
        this.http = http;
        this.config = config;
    }
    MeetingService.prototype.getAll = function () {
        return this.http.get(this.config.apiUrl + '/meetings', this.jwt()).map(function (response) { return response.json(); });
    };
    MeetingService.prototype.getById = function (_id) {
        return this.http.get(this.config.apiUrl + '/meetings/' + _id, this.jwt()).map(function (response) { return response.json(); });
    };
    MeetingService.prototype.create = function (meeting) {
        return this.http.post(this.config.apiUrl + '/meetings/register', meeting, this.jwt());
    };
    MeetingService.prototype.update = function (meeting) {
        return this.http.put(this.config.apiUrl + '/meetings/' + meeting["_id"], meeting, this.jwt());
    };
    MeetingService.prototype.delete = function (_id) {
        return this.http.delete(this.config.apiUrl + '/meetings/' + _id, this.jwt());
    };
    // private helper methods
    MeetingService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    return MeetingService;
}());
MeetingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, app_config_1.AppConfig])
], MeetingService);
exports.MeetingService = MeetingService;
//# sourceMappingURL=meeting.service.js.map