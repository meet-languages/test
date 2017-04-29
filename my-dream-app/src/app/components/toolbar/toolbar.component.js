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
// components/toolbar.component.ts
var core_1 = require("@angular/core");
var auth_service_1 = require("../../services/auth.service");
var ToolbarComponent = (function () {
    function ToolbarComponent(auth) {
        this.auth = auth;
    }
    ToolbarComponent.prototype.login = function () {
        this.auth.login();
    };
    ToolbarComponent.prototype.logout = function () {
        this.auth.logout();
    };
    return ToolbarComponent;
}());
ToolbarComponent = __decorate([
    core_1.Component({
        selector: 'toolbar',
        template: "\n    <div class=\"toolbar\">\n      <button (click)=\"auth.login()\">Login</button>\n      <button (click)=\"auth.logout()\">Logout</button>\n    </div>\n  ",
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" && _a || Object])
], ToolbarComponent);
exports.ToolbarComponent = ToolbarComponent;
var _a;
//# sourceMappingURL=toolbar.component.js.map