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
var PanelUserComponent = (function () {
    function PanelUserComponent(userService, router, route, location) {
        this.userService = userService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    PanelUserComponent.prototype.ngOnInit = function () {
        this.loadAllUsers();
    };
    PanelUserComponent.prototype.loadAllUsers = function () {
        var _this = this;
        this.userService.getAll().subscribe(function (users) { _this.users = users; });
    };
    PanelUserComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/my-profile', this.currentUser["_id"]]);
    };
    return PanelUserComponent;
}());
PanelUserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'panel-user',
        templateUrl: 'panel-user.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], PanelUserComponent);
exports.PanelUserComponent = PanelUserComponent;
//# sourceMappingURL=panel-user.component.js.map