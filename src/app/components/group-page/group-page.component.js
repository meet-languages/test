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
var img_service_1 = require("../../_services/img.service");
var user_service_1 = require("../../_services/user.service");
var group_service_1 = require("../../_services/group.service");
var GroupPageComponent = (function () {
    function GroupPageComponent(groupService, userService, route, router, location, imgS) {
        this.groupService = groupService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.imgS = imgS;
        this.avatarPaths = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    GroupPageComponent.prototype.ngOnInit = function () {
        this.loadGroup();
        this.loadUser();
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
            .subscribe(function (users) {
            _this.users = users;
            _this.setAvatarPaths();
        });
    };
    GroupPageComponent.prototype.setAvatarPaths = function () {
        var _this = this;
        this.users.forEach(function (item, index) {
            _this.avatarPaths[index] = _this.imgS.getAvatarPath(_this.users[index]['_id']);
        });
    };
    GroupPageComponent.prototype.loadUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (user) { return _this.user = user; });
    };
    GroupPageComponent.prototype.deleteGroup = function (_id) {
        this.groupService.delete(_id).subscribe(function () { });
        this.router.navigate(['/template/groups']);
    };
    GroupPageComponent.prototype.userInGroup = function (id) {
        for (var i = 0; i < this.user.groups.length; i++) {
            if (this.user.groups[i] == id) {
                return true;
            }
        }
        return false;
    };
    GroupPageComponent.prototype.userInLikes = function (id) {
        for (var i = 0; i < this.group.likes.length; i++) {
            if (this.group.likes[i] == id) {
                return true;
            }
        }
        return false;
    };
    GroupPageComponent.prototype.joinGroup = function (group) {
        var _this = this;
        this.user.groups.push(group["_id"]);
        this.group.users.push(this.user["_id"]);
        this.userService.update(this.user).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
        this.groupService.update(this.group).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
    };
    GroupPageComponent.prototype.leaveGroup = function (group) {
        var _this = this;
        var indexUser = this.user.groups.indexOf(group["_id"]);
        var indexGroup = this.group.users.indexOf(this.user["_id"]);
        if (indexUser > -1) {
            this.user.groups.splice(indexUser, 1);
        }
        if (indexGroup > -1) {
            this.group.users.splice(indexGroup, 1);
        }
        this.userService.update(this.user).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
        this.groupService.update(this.group).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
        this.loadGroup();
        this.loadUser();
        this.loadMyUsers();
    };
    GroupPageComponent.prototype.onSelect = function (user) {
        this.user = user;
    };
    GroupPageComponent.prototype.gotoProfile = function () {
        var id = "_id";
        if (this.user[id] === this.currentUser[id])
            this.router.navigate(['/template/my-profile', this.currentUser[id]]);
        else
            this.router.navigate(['/template/profile', this.user[id]]);
    };
    GroupPageComponent.prototype.like = function (user) {
        var _this = this;
        this.group.likes.push(user["_id"]);
        this.groupService.update(this.group).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
    };
    GroupPageComponent.prototype.disLike = function (user) {
        var _this = this;
        var indexGroup = this.group.likes.indexOf(this.user["_id"]);
        if (indexGroup > -1) {
            this.group.likes.splice(indexGroup, 1);
        }
        this.groupService.update(this.group).subscribe(function () {
            _this.loadGroup();
            _this.loadUser();
            _this.loadMyUsers();
        });
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
        router_1.Router,
        common_1.Location,
        img_service_1.imgService])
], GroupPageComponent);
exports.GroupPageComponent = GroupPageComponent;
//# sourceMappingURL=group-page.component.js.map