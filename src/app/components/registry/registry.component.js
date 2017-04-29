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
var http_1 = require("@angular/http");
var RegistryComponent = (function () {
    function RegistryComponent(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    RegistryComponent.prototype.onSubmit = function (user) {
        var id = "";
        var url = "http://localhost:4000/sessions";
        return this.http
            .post(url, JSON.stringify(user), { headers: this.headers })
            .toPromise()
            .then(function () { return user; })
            .catch(this.handleError);
    };
    RegistryComponent.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return RegistryComponent;
}());
RegistryComponent = __decorate([
    core_1.Component({
        selector: 'registry',
        templateUrl: "./registry.component.html",
        providers: [auth_service_1.AuthService]
    }),
    __metadata("design:paramtypes", [http_1.Http])
], RegistryComponent);
exports.RegistryComponent = RegistryComponent;
//# sourceMappingURL=registry.component.js.map