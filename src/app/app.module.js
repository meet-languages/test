"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var main_component_1 = require("./components/template/main.component");
var users_component_1 = require("./components/users/users.component");
var profile_component_1 = require("./components/profile/profile.component");
var my_profile_component_1 = require("./components/my-profile/my-profile.component");
var edit_profile_component_1 = require("./components/edit-profile/edit-profile.component");
var panel_user_component_1 = require("./components/panel-user/panel-user.component");
var friends_online_component_1 = require("./components/friends/friends-online.component");
var registry_component_1 = require("./components/registry/registry.component");
var login_component_1 = require("./components/registry/login.component");
// import { UserService }          from './services/user.service';
var app_routing_module_1 = require("./app.routing.module");
var alert_component_1 = require("./_directives/alert.component");
var auth_guard_1 = require("./_guards/auth.guard");
var alert_service_1 = require("./_services/alert.service");
var authentication_service_1 = require("./_services/authentication.service");
var user_service_1 = require("./_services/user.service");
var app_config_1 = require("./app.config");
// @NgModule metadata's imports array, which contains the list of external modules that the app uses
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule
        ],
        declarations: [
            app_component_1.AppComponent,
            registry_component_1.RegistryComponent,
            login_component_1.LoginComponent,
            main_component_1.TemplateComponent,
            users_component_1.UsersComponent,
            profile_component_1.ProfileComponent,
            my_profile_component_1.MyProfileComponent,
            panel_user_component_1.PanelUserComponent,
            edit_profile_component_1.EditProfileComponent,
            friends_online_component_1.FriendsOnlineComponent,
            alert_component_1.AlertComponent
        ],
        providers: [
            user_service_1.UserService,
            app_config_1.AppConfig,
            auth_guard_1.AuthGuard,
            authentication_service_1.AuthenticationService,
            alert_service_1.AlertService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map