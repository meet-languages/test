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
var meeting_service_1 = require("../../_services/meeting.service");
var router_1 = require("@angular/router");
var MeetingsComponent = (function () {
    function MeetingsComponent(meetingService, router) {
        this.meetingService = meetingService;
        this.router = router;
        this.meetings = [];
    }
    MeetingsComponent.prototype.ngOnInit = function () {
        this.loadAllMeetings();
    };
    MeetingsComponent.prototype.loadAllMeetings = function () {
        var _this = this;
        this.meetingService.getAll().subscribe(function (meetings) { _this.meetings = meetings; });
    };
    MeetingsComponent.prototype.onSelect = function (meeting) {
        this.currentMeeting = meeting;
    };
    MeetingsComponent.prototype.gotoMeetingPage = function () {
        var id = "_id";
        this.router.navigate(['/template/meeting-page', this.currentMeeting[id]]);
    };
    return MeetingsComponent;
}());
MeetingsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'meetings',
        templateUrl: '/app/components/meetings/meetings.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [meeting_service_1.MeetingService, router_1.Router])
], MeetingsComponent);
exports.MeetingsComponent = MeetingsComponent;
//# sourceMappingURL=meetings.component.js.map