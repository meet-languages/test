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
var user_service_1 = require("../../services/user.service");
var EditProfileComponent = (function () {
    function EditProfileComponent(userService, route, location) {
        this.userService = userService;
        this.route = route;
        this.location = location;
    }
    // No funciona correctamente.
    EditProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getUser(params["id"]); })
            .subscribe(function (user) { return _this.user = user; });
    };
    EditProfileComponent.prototype.save = function () {
        var _this = this;
        this.userService.update(this.user)
            .then(function () { return _this.goBack(); });
    };
    EditProfileComponent.prototype.goBack = function () {
        this.location.back();
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    core_1.Component({
        selector: 'edit-profile',
        templateUrl: './edit-profile.component.html',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" && _a || Object, router_1.ActivatedRoute,
        common_1.Location])
], EditProfileComponent);
exports.EditProfileComponent = EditProfileComponent;
var _a;
//# sourceMappingURL=edit-profile.component.js.map