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
var router_1 = require("@angular/router");
var UsersComponent = (function () {
    function UsersComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.users = [];
        this.friends = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
        this.loadCurrentUser();
        this.loadMyFriends();
    };
    UsersComponent.prototype.deleteUser = function (_id) {
        var _this = this;
        this.userService.delete(_id).subscribe(function () { _this.loadAllUsers(); });
    };
    UsersComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
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
    UsersComponent.prototype.joinFriend = function (user) {
        var _this = this;
        this.currentUser.friends.push(user["_id"]);
        user.friends.push(this.currentUser["_id"]);
        this.userService.update(user).subscribe(function () {
            _this.loadMyFriends();
            _this.loadCurrentUser();
        });
        this.userService.update(this.currentUser).subscribe(function () {
            _this.loadMyFriends();
            _this.loadCurrentUser();
        });
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
    __metadata("design:paramtypes", [user_service_1.UserService, router_1.Router])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map