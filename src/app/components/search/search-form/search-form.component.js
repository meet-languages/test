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
var SearchFormComponent = (function () {
    function SearchFormComponent(userService, route, router, location) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser);
    }
    ;
    SearchFormComponent.prototype.ngOnInit = function () {
        this.loadUser();
        this.loadMyUsers();
    };
    SearchFormComponent.prototype.loadMyUsers = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getMyUsers(params["id"]); })
            .subscribe(function (users) { _this.users = users; });
    };
    SearchFormComponent.prototype.loadUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (user) { return _this.user = user; });
    };
    return SearchFormComponent;
}());
SearchFormComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'search-form',
        templateUrl: '/app/components/search/search-form/search-form.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.ActivatedRoute,
        router_1.Router,
        common_1.Location])
], SearchFormComponent);
exports.SearchFormComponent = SearchFormComponent;
//# sourceMappingURL=search-form.component.js.map