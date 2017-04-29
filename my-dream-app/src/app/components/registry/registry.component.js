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
// components/registry.component.ts
var core_1 = require("@angular/core");
var auth_service_1 = require("../../services/auth.service");
var RegistryComponent = (function () {
    function RegistryComponent(auth) {
        this.auth = auth;
    }
    RegistryComponent.prototype.login = function () {
    };
    RegistryComponent.prototype.logout = function () {
    };
    return RegistryComponent;
}());
RegistryComponent = __decorate([
    core_1.Component({
        selector: 'registry',
        templateUrl: "./registry.component.html",
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _a || Object])
], RegistryComponent);
exports.RegistryComponent = RegistryComponent;
var _a;
//# sourceMappingURL=registry.component.js.map