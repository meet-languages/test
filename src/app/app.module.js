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
var groups_component_1 = require("./components/groups/groups.component");
var create_group_component_1 = require("./components/create-group/create-group.component");
var meetings_component_1 = require("./components/meetings/meetings.component");
var profile_component_1 = require("./components/profile/profile.component");
var group_page_component_1 = require("./components/group-page/group-page.component");
var search_component_1 = require("./components/search/search.component");
var home_component_1 = require("./components/home/home.component");
var messages_component_1 = require("./components/messages/messages.component");
var notifications_component_1 = require("./components/notifications/notifications.component");
var my_friends_component_1 = require("./components/my-friends/my-friends.component");
var my_groups_component_1 = require("./components/my-groups/my-groups.component");
var my_profile_component_1 = require("./components/my-profile/my-profile.component");
var edit_profile_component_1 = require("./components/edit-profile/edit-profile.component");
var panel_user_component_1 = require("./components/panel-user/panel-user.component");
var friends_online_component_1 = require("./components/friends/friends-online.component");
var user_search_component_1 = require("./components/user-search/user-search.component");
var registry_component_1 = require("./components/registry/registry.component");
var login_component_1 = require("./components/registry/login.component");
// import { UserService }          from './services/user.service';
var app_routing_module_1 = require("./app.routing.module");
var alert_component_1 = require("./_directives/alert.component");
var auth_guard_1 = require("./_guards/auth.guard");
var alert_service_1 = require("./_services/alert.service");
var authentication_service_1 = require("./_services/authentication.service");
var user_service_1 = require("./_services/user.service");
var group_service_1 = require("./_services/group.service");
var user_search_service_1 = require("./_services/user-search.service");
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
            groups_component_1.GroupsComponent,
            group_page_component_1.GroupPageComponent,
            create_group_component_1.CreateGroupComponent,
            meetings_component_1.MeetingsComponent,
            search_component_1.SearchComponent,
            home_component_1.HomeComponent,
            messages_component_1.MessagesComponent,
            notifications_component_1.NotificationsComponent,
            my_friends_component_1.MyFriendsComponent,
            my_groups_component_1.MyGroupsComponent,
            profile_component_1.ProfileComponent,
            my_profile_component_1.MyProfileComponent,
            panel_user_component_1.PanelUserComponent,
            edit_profile_component_1.EditProfileComponent,
            friends_online_component_1.FriendsOnlineComponent,
            user_search_component_1.UserSearchComponent,
            alert_component_1.AlertComponent
        ],
        providers: [
            user_service_1.UserService,
            group_service_1.GroupService,
            user_search_service_1.UserSearchService,
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