"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var registry_component_1 = require("./components/registry/registry.component");
var users_component_1 = require("./components/users/users.component");
var groups_component_1 = require("./components/groups/groups.component");
var group_page_component_1 = require("./components/group-page/group-page.component");
var create_group_component_1 = require("./components/create-group/create-group.component");
var meetings_component_1 = require("./components/meetings/meetings.component");
var meeting_page_component_1 = require("./components/meeting-page/meeting-page.component");
var search_component_1 = require("./components/search/search.component");
var search_form_component_1 = require("./components/search/search-form/search-form.component");
var search_users_component_1 = require("./components/search/search-users/search-users.component");
var home_component_1 = require("./components/home/home.component");
var messages_component_1 = require("./components/messages/messages.component");
var notifications_component_1 = require("./components/notifications/notifications.component");
var my_friends_component_1 = require("./components/my-friends/my-friends.component");
var my_groups_component_1 = require("./components/my-groups/my-groups.component");
var profile_component_1 = require("./components/profile/profile.component");
var my_profile_component_1 = require("./components/my-profile/my-profile.component");
var main_component_1 = require("./components/template/main.component");
var edit_profile_component_1 = require("./components/edit-profile/edit-profile.component");
var imgupload_component_1 = require("./components/imgupload/imgupload.component");
var auth_guard_1 = require("./_guards/auth.guard");
exports.routes = [
    { path: '', redirectTo: 'template', canActivate: [auth_guard_1.AuthGuard], pathMatch: 'full' },
    { path: 'registry', component: registry_component_1.RegistryComponent },
    {
        path: 'template', component: main_component_1.TemplateComponent, canActivate: [auth_guard_1.AuthGuard], children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'users', component: users_component_1.UsersComponent },
            { path: 'groups', component: groups_component_1.GroupsComponent },
            { path: 'group-page/:id', component: group_page_component_1.GroupPageComponent },
            { path: 'create-group', component: create_group_component_1.CreateGroupComponent },
            { path: 'meetings', component: meetings_component_1.MeetingsComponent },
            { path: 'meeting-page/:id', component: meeting_page_component_1.MeetingPageComponent },
            {
                path: 'search', component: search_component_1.SearchComponent, children: [
                    { path: '', redirectTo: 'search-form', pathMatch: 'full' },
                    { path: 'search-form', component: search_form_component_1.SearchFormComponent },
                    { path: 'search-users', component: search_users_component_1.SearchUsersComponent },
                ]
            },
            { path: 'home', component: home_component_1.HomeComponent },
            { path: 'messages', component: messages_component_1.MessagesComponent },
            { path: 'notifications', component: notifications_component_1.NotificationsComponent },
            { path: 'my-friends', component: my_friends_component_1.MyFriendsComponent },
            { path: 'my-groups', component: my_groups_component_1.MyGroupsComponent },
            { path: 'profile/:id', component: profile_component_1.ProfileComponent },
            { path: 'my-profile/:id', component: my_profile_component_1.MyProfileComponent },
            { path: 'edit-profile/:id', component: edit_profile_component_1.EditProfileComponent },
            { path: 'imgupload', component: imgupload_component_1.imgUploadComponent },
        ]
    },
    { path: '**', redirectTo: 'registry' }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(exports.routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.module.js.map