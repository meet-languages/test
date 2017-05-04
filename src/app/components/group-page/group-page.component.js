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
var group_service_1 = require("../../_services/group.service");
var GroupPageComponent = (function () {
    function GroupPageComponent(groupService, userService, route, location) {
        this.groupService = groupService;
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    GroupPageComponent.prototype.ngOnInit = function () {
        this.loadGroup();
        this.loadMyUsers();
    };
    GroupPageComponent.prototype.loadGroup = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.groupService.getById(params["id"]); })
            .subscribe(function (group) { return _this.group = group; });
    };
    GroupPageComponent.prototype.loadMyUsers = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getMyUsers(params["id"]); })
            .subscribe(function (users) { _this.users = users; });
    };
    GroupPageComponent.prototype.joinGroup = function (group) {
        for (var i = 0; i < this.currentUser.groups.length; i++) {
            if (this.currentUser.groups[i] !== group["_id"]) {
                this.currentUser.groups.push(group["_id"]);
                this.group.users.push(this.currentUser["_id"]);
                this.userService.update(this.currentUser).subscribe(function () { });
                this.groupService.update(this.group).subscribe(function () { });
                this.loadGroup();
            }
        }
    };
    return GroupPageComponent;
}());
GroupPageComponent = __decorate([
    core_1.Component({
        selector: 'group-page',
        templateUrl: './group-page.component.html',
    }),
    __metadata("design:paramtypes", [group_service_1.GroupService,
        user_service_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location])
], GroupPageComponent);
exports.GroupPageComponent = GroupPageComponent;
//# sourceMappingURL=group-page.component.js.map