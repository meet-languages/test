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
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var user_service_1 = require("../../../_services/user.service");
var SearchUsersComponent = (function () {
    function SearchUsersComponent(userService, route, location, router) {
        this.userService = userService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    SearchUsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getData().subscribe(function (users) {
            _this.users = users;
        });
    };
    SearchUsersComponent.prototype.onSelect = function (user) {
        this.currentUser = user;
    };
    SearchUsersComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/profile', this.currentUser[id]]);
    };
    return SearchUsersComponent;
}());
SearchUsersComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search-users',
        templateUrl: '/app/components/search/search-users/search-users.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        common_1.Location,
        router_1.Router])
], SearchUsersComponent);
exports.SearchUsersComponent = SearchUsersComponent;
//# sourceMappingURL=search-users.component.js.map