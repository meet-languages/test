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
var router_1 = require("@angular/router");
var FriendsOnlineComponent = (function () {
    function FriendsOnlineComponent(userService, router, imgS) {
        this.userService = userService;
        this.router = router;
        this.imgS = imgS;
        this.avatarPaths = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    FriendsOnlineComponent.prototype.ngOnInit = function () {
        this.loadMyFriends();
    };
    FriendsOnlineComponent.prototype.loadMyFriends = function () {
        var _this = this;
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(function (friends) {
            _this.friends = friends;
            _this.setAvatarPaths();
        });
    };
    FriendsOnlineComponent.prototype.setAvatarPaths = function () {
        var _this = this;
        this.friends.forEach(function (item, index) {
            _this.avatarPaths[index] = _this.imgS.getAvatarPath(_this.friends[index]['_id']);
        });
    };
    FriendsOnlineComponent.prototype.onSelect = function (user) {
        this.currentUser = user;
    };
    FriendsOnlineComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/profile', this.currentUser[id]]);
    };
    return FriendsOnlineComponent;
}());
FriendsOnlineComponent = __decorate([
    core_1.Component({
        selector: 'friends-online',
        template: "\n  \n      <h3>Friends online</h3>\n      <hr>\n      <div class=\"text-center\" style=\"display: inline-block  margin: 10px;\" *ngFor=\"let user of friends; let i = index;\">\n       <div class=\"text-center\">\n        <a style=\"cursor: pointer; margin-left: 10px\" (click)=\"onSelect(user)\" (click)=\"gotoProfile()\">\n          <img src=\"{{avatarPaths[i]}}\" (error)=\"avatarPaths[i]=this.imgS.getDefaultAvatarPath();\" alt=\"avatar_meetlanguages\" class=\"imp-responsive4 membersGroup\" id=\"avatar\" title=\"\" data-toggle=\"popover\" data-content=\"Language I want to learn: English Language: Spanish\" data-trigger=\"hover\" data-original-title=\"Nombre Apellido\"></a>\n       </div>\n       <div class=\"text-center text-muted medium\">\n        {{user.name}}\n       </div>\n      </div>\n\n  ",
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        img_service_1.imgService])
], FriendsOnlineComponent);
exports.FriendsOnlineComponent = FriendsOnlineComponent;
//# sourceMappingURL=friends-online.component.js.map