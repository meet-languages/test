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
var meeting_service_1 = require("../../_services/meeting.service");
var MeetingPageComponent = (function () {
    function MeetingPageComponent(meetingService, userService, route, location) {
        this.meetingService = meetingService;
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    MeetingPageComponent.prototype.ngOnInit = function () {
        this.loadMeeting();
        this.loadUser();
    };
    MeetingPageComponent.prototype.loadMeeting = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.meetingService.getById(params["id"]); })
            .subscribe(function (meeting) { return _this.meeting = meeting; });
    };
    MeetingPageComponent.prototype.loadUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (user) { return _this.user = user; });
    };
    MeetingPageComponent.prototype.userInLikes = function (id) {
        for (var i = 0; i <= this.meeting.likes.length; i++) {
            if (this.meeting.likes[i] == id) {
                return true;
            }
        }
        return false;
    };
    MeetingPageComponent.prototype.like = function (user) {
        var _this = this;
        this.meeting.likes.push(user["_id"]);
        this.meetingService.update(this.meeting).subscribe(function () {
            _this.loadMeeting();
            _this.loadUser();
        });
    };
    MeetingPageComponent.prototype.disLike = function (user) {
        var _this = this;
        var indexMeeting = this.meeting.likes.indexOf(this.user["_id"]);
        if (indexMeeting > -1) {
            this.meeting.likes.splice(indexMeeting, 1);
        }
        this.meetingService.update(this.meeting).subscribe(function () {
            _this.loadMeeting();
            _this.loadUser();
        });
    };
    return MeetingPageComponent;
}());
MeetingPageComponent = __decorate([
    core_1.Component({
        selector: 'meeting-page',
        templateUrl: './meeting-page.component.html',
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location])
], MeetingPageComponent);
exports.MeetingPageComponent = MeetingPageComponent;
//# sourceMappingURL=meeting-page.component.js.map