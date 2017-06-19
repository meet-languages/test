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
var friend_request_service_1 = require("../../_services/friend-request.service");
var user_service_1 = require("../../_services/user.service");
var img_service_1 = require("../../_services/img.service");
var alert_service_1 = require("../../_services/alert.service");
var router_1 = require("@angular/router");
var NotificationsComponent = (function () {
    function NotificationsComponent(userService, router, imgS, friendRequestService, alertService) {
        this.userService = userService;
        this.router = router;
        this.imgS = imgS;
        this.friendRequestService = friendRequestService;
        this.alertService = alertService;
        this.friendRequest = [];
        this.usersRequest = [];
        this.avatarPaths = {};
        this.friends = [];
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    NotificationsComponent.prototype.ngOnInit = function () {
        this.loadCurrentUser();
        this.loadFriendRequests();
        this.loadMyFriends();
    };
    NotificationsComponent.prototype.loadCurrentUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (currentUser) { return _this.currentUser = currentUser; });
    };
    NotificationsComponent.prototype.loadUser = function (id) {
        var _this = this;
        this.userService.getById(id)
            .subscribe(function (user) { return _this.user = user; });
    };
    NotificationsComponent.prototype.loadAvatar = function (id) {
        this.avatarPaths[id] = this.imgS.getAvatarPath(id);
    };
    NotificationsComponent.prototype.loadFriendRequests = function () {
        var _this = this;
        this.friendRequestService.getMyFriendRequest(this.currentUser["_id"]).subscribe(function (friendRequests) {
            _this.friendRequest = friendRequests;
            _this.loadNameUser();
        });
    };
    NotificationsComponent.prototype.loadMyFriends = function () {
        var _this = this;
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(function (friends) { _this.friends = friends; });
    };
    NotificationsComponent.prototype.getIdRequest = function (id) {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].from == id) {
                return this.friendRequest[i]["_id"];
            }
        }
    };
    NotificationsComponent.prototype.loadNameUser = function () {
        var _this = this;
        this.usersRequest = [];
        for (var i = 0; i < this.friendRequest.length; i++) {
            this.loadAvatar(this.friendRequest[i].from.toString());
            this.userService.getById(this.friendRequest[i].from.toString())
                .subscribe(function (user) {
                return _this.usersRequest.push(user.name);
            });
        }
    };
    NotificationsComponent.prototype.joinFriend = function (idUser) {
        var _this = this;
        this.userService.getById(idUser)
            .subscribe(function (user) {
            _this.user = user;
            _this.user.friends.push(_this.currentUser["_id"]);
            _this.userService.update(_this.user).subscribe(function () {
                _this.loadMyFriends();
                _this.loadCurrentUser();
            });
        });
        this.currentUser.friends.push(idUser);
        this.userService.update(this.currentUser).subscribe(function () {
            _this.loadMyFriends();
            _this.loadCurrentUser();
        });
        this.deleteRequest(idUser);
        this.loadNameUser();
    };
    NotificationsComponent.prototype.deleteRequest = function (_id) {
        var _this = this;
        this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(function () { _this.loadFriendRequests(); });
        this.loadNameUser();
    };
    return NotificationsComponent;
}());
NotificationsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'notifications',
        templateUrl: '/app/components/notifications/notifications.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        img_service_1.imgService,
        friend_request_service_1.FriendRequestService,
        alert_service_1.AlertService])
], NotificationsComponent);
exports.NotificationsComponent = NotificationsComponent;
//# sourceMappingURL=notifications.component.js.map