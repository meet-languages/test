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
var user_service_1 = require("../../_services/user.service");
var img_service_1 = require("../../_services/img.service");
var friend_request_service_1 = require("../../_services/friend-request.service");
var alert_service_1 = require("../../_services/alert.service");
var router_1 = require("@angular/router");
var UsersComponent = (function () {
    function UsersComponent(userService, router, imgS, friendRequestService, alertService) {
        this.userService = userService;
        this.router = router;
        this.imgS = imgS;
        this.friendRequestService = friendRequestService;
        this.alertService = alertService;
        this.modelRequest = {};
        this.users = [];
        this.friends = [];
        this.friendRequest = [];
        this.avatarPaths = [];
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.loadCurrentUser();
        this.loadMyFriends();
        this.getFriendRequests();
    };
    UsersComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) {
            _this.users = users;
            _this.setAvatarPaths();
        });
    };
    UsersComponent.prototype.loadMyFriends = function () {
        var _this = this;
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(function (friends) { _this.friends = friends; });
    };
    UsersComponent.prototype.loadCurrentUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (currentUser) { return _this.currentUser = currentUser; });
    };
    UsersComponent.prototype.userInFriends = function (id) {
        for (var i = 0; i < this.currentUser.friends.length; i++) {
            if (this.currentUser.friends[i] == id) {
                return true;
            }
        }
        return false;
    };
    UsersComponent.prototype.setAvatarPaths = function () {
        var _this = this;
        this.users.forEach(function (item, index) {
            _this.avatarPaths[index] = _this.imgS.getAvatarPath(_this.users[index]['_id']);
        });
        console.log(this.avatarPaths);
    };
    UsersComponent.prototype.getFriendRequests = function () {
        var _this = this;
        this.friendRequestService.getSentFriendRequest(this.currentUser["_id"]).subscribe(function (friendRequests) {
            _this.friendRequest = friendRequests;
        });
    };
    UsersComponent.prototype.userInRequests = function (id) {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return true;
            }
        }
        return false;
    };
    UsersComponent.prototype.getIdRequest = function (id) {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return this.friendRequest[i]["_id"];
            }
        }
    };
    UsersComponent.prototype.deleteRequest = function (_id) {
        var _this = this;
        this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(function () { _this.getFriendRequests(); });
    };
    UsersComponent.prototype.leaveFriend = function (user) {
        var _this = this;
        var indexCurrentUser = this.currentUser.friends.indexOf(user["_id"]);
        var indexUser = user.friends.indexOf(this.currentUser["_id"]);
        if (indexCurrentUser > -1) {
            this.currentUser.friends.splice(indexCurrentUser, 1);
        }
        if (indexUser > -1) {
            user.friends.splice(indexUser, 1);
        }
        this.userService.update(this.currentUser).subscribe(function () {
            _this.loadMyFriends();
            _this.loadCurrentUser();
        });
        this.userService.update(user).subscribe(function () {
            _this.loadMyFriends();
            _this.loadCurrentUser();
        });
    };
    UsersComponent.prototype.sendRequest = function () {
        var _this = this;
        this.loading = true;
        this.modelRequest.from = this.currentUser["_id"];
        this.modelRequest.to = this.selectUser["_id"];
        this.modelRequest.msg = this.msg;
        this.friendRequestService.create(this.modelRequest)
            .subscribe(function (data) {
            _this.alertService.success('Friend request sent succesful', true);
            _this.getFriendRequests();
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
        this.msg = "";
    };
    UsersComponent.prototype.onSelect = function (user) {
        this.selectUser = user;
    };
    UsersComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/profile', this.selectUser[id]]);
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'users',
        templateUrl: '/app/components/users/users.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        img_service_1.imgService,
        friend_request_service_1.FriendRequestService,
        alert_service_1.AlertService])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map