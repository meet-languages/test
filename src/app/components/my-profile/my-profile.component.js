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
var MyProfileComponent = (function () {
    function MyProfileComponent(userService, router, route, location) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser);
    }
    ;
    MyProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadAllUsers();
        this.userService.getById(this.currentUser["_id"]).subscribe(function (connectedUser) { _this.connectedUser = connectedUser; });
        console.log(this.connectedUser);
        this.route.params
            .switchMap(function (params) { return _this.userService.getById(params["id"]); })
            .subscribe(function (user) { return _this.user = user; });
    };
    MyProfileComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    MyProfileComponent.prototype.gotoEditProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/edit-profile', this.user[id]]);
    };
    return MyProfileComponent;
}());
MyProfileComponent = __decorate([
    core_1.Component({
        selector: 'my-profile',
        templateUrl: './my-profile.component.html',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], MyProfileComponent);
exports.MyProfileComponent = MyProfileComponent;
//# sourceMappingURL=my-profile.component.js.map