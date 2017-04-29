"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var profile_component_1 = require("./components/profile/profile.component");
var registry_component_1 = require("./components/registry/registry.component");
var users_component_1 = require("./components/users/users.component");
var edit_profile_component_1 = require("./components/edit-profile/edit-profile.component");
var routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: users_component_1.UsersComponent },
    { path: 'profile/:id', component: profile_component_1.ProfileComponent },
    { path: 'edit-profile/:id', component: edit_profile_component_1.EditProfileComponent },
    { path: 'registry', component: registry_component_1.RegistryComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.module.js.map