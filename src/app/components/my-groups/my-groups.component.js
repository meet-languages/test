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
var group_service_1 = require("../../_services/group.service");
var user_service_1 = require("../../_services/user.service");
var router_1 = require("@angular/router");
var MyGroupsComponent = (function () {
    function MyGroupsComponent(userService, groupService, router) {
        this.userService = userService;
        this.groupService = groupService;
        this.router = router;
        this.groups = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    MyGroupsComponent.prototype.ngOnInit = function () {
        this.loadMyGroups();
        console.log(this.currentUser);
    };
    MyGroupsComponent.prototype.loadMyGroups = function () {
        var _this = this;
        this.groupService.getMyGroups(this.currentUser["_id"]).subscribe(function (groups) { _this.groups = groups; });
    };
    MyGroupsComponent.prototype.onSelect = function (group) {
        this.currentGroup = group;
    };
    MyGroupsComponent.prototype.gotoGroupPage = function () {
        var id = "_id";
        this.router.navigate(['/template/group-page', this.currentGroup[id]]);
    };
    return MyGroupsComponent;
}());
MyGroupsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-groups',
        templateUrl: '/app/components/my-groups/my-groups.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, group_service_1.GroupService, router_1.Router])
], MyGroupsComponent);
exports.MyGroupsComponent = MyGroupsComponent;
//# sourceMappingURL=my-groups.component.js.map