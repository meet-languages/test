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
var friend_request_service_1 = require("../../_services/friend-request.service");
var user_service_1 = require("../../_services/user.service");
var message_service_1 = require("../../_services/message.service");
var alert_service_1 = require("../../_services/alert.service");
var ProfileComponent = (function () {
    function ProfileComponent(userService, messageService, route, location, imgS, friendRequestService, alertService) {
        this.userService = userService;
        this.messageService = messageService;
        this.route = route;
        this.location = location;
        this.imgS = imgS;
        this.friendRequestService = friendRequestService;
        this.alertService = alertService;
        this.model = { messages: [] };
        this.friendRequest = [];
        this.modelRequest = {};
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    ProfileComponent.prototype.ngOnInit = function () {
        this.loadUser();
        this.loadCurrentUser();
        this.loadMyFriends();
        this.getFriendRequests();
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
    ProfileComponent.prototype.getFriendRequests = function () {
        var _this = this;
        this.friendRequestService.getSentFriendRequest(this.currentUser["_id"]).subscribe(function (friendRequests) {
            _this.friendRequest = friendRequests;
        });
    };
    ProfileComponent.prototype.userInRequests = function (id) {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return true;
            }
        }
        return false;
    };
    ProfileComponent.prototype.getIdRequest = function (id) {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return this.friendRequest[i]["_id"];
            }
        }
    };
    /*joinFriend(user: User): void {
      this.currentUser.friends.push(user["_id"]);
      user.friends.push(this.currentUser["_id"]);
      this.userService.update(user).subscribe(() => {
        this.loadMyFriends();
      });
      this.userService.update(this.currentUser).subscribe(() => {
        this.loadMyFriends();
      });
    }*/
    ProfileComponent.prototype.deleteRequest = function (_id) {
        var _this = this;
        this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(function () { _this.getFriendRequests(); });
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
    ProfileComponent.prototype.sendRequest = function () {
        var _this = this;
        this.loading = true;
        this.modelRequest.from = this.currentUser["_id"];
        this.modelRequest.to = this.selectUser["_id"];
        this.modelRequest.msg = this.msg;
        console.log(this.modelRequest);
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
    ProfileComponent.prototype.loadUser = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getById(params["id"]); })
            .subscribe(function (user) {
            _this.user = user;
            _this.avatarPath = _this.imgS.getAvatarPath(_this.user["_id"]);
        });
    };
    ProfileComponent.prototype.createMessage = function (user) {
        var _this = this;
        this.loading = true;
        this.model.from = this.currentUser["_id"];
        this.model.to = user["_id"];
        this.model.messages.push({
            name: this.currentUser.name,
            when: new Date(),
            content: this.msg,
            read: false
        });
        this.messageService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Message sent succesful', true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
        this.msg = "";
    };
    ProfileComponent.prototype.onSelect = function (user) {
        this.selectUser = user;
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        selector: 'profile',
        templateUrl: './profile.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        message_service_1.MessageService,
        router_1.ActivatedRoute,
        common_1.Location,
        img_service_1.imgService,
        friend_request_service_1.FriendRequestService,
        alert_service_1.AlertService])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map