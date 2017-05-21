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
var ProfileComponent = (function () {
    function ProfileComponent(userService, route, location, imgS) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.imgS = imgS;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    ProfileComponent.prototype.ngOnInit = function () {
        this.loadUser();
        this.loadCurrentUser();
        this.loadMyFriends();
    };
    ProfileComponent.prototype.loadMyFriends = function () {
        var _this = this;
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(function (friends) { _this.friends = friends; });
    };
    ProfileComponent.prototype.loadCurrentUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (currentUser) { return _this.currentUser = currentUser; });
    };
    ProfileComponent.prototype.userInFriends = function (id) {
        for (var i = 0; i < this.currentUser.friends.length; i++) {
            if (this.currentUser.friends[i] == id) {
                return true;
            }
        }
        return false;
    };
    ProfileComponent.prototype.joinFriend = function (user) {
        var _this = this;
        this.currentUser.friends.push(user["_id"]);
        user.friends.push(this.currentUser["_id"]);
        this.userService.update(user).subscribe(function () {
            _this.loadMyFriends();
        });
        this.userService.update(this.currentUser).subscribe(function () {
            _this.loadMyFriends();
        });
    };
    ProfileComponent.prototype.leaveFriend = function (user) {
        var _this = this;
        var indexCurrentUser = user.friends.indexOf(this.currentUser["_id"]);
        var indexUser = this.currentUser.friends.indexOf(user["_id"]);
        if (indexCurrentUser > -1) {
            this.currentUser.friends.splice(indexCurrentUser, 1);
        }
        if (indexUser > -1) {
            user.friends.splice(indexUser, 1);
        }
        this.userService.update(this.currentUser).subscribe(function () {
            _this.loadMyFriends();
        });
        this.userService.update(user).subscribe(function () {
            _this.loadMyFriends();
        });
    };
    ProfileComponent.prototype.loadUser = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getById(params["id"]); })
            .subscribe(function (user) {
            _this.user = user;
            _this.avatarPath = _this.imgS.getAvatarPath(_this.user["_id"]);
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location,
        img_service_1.imgService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map