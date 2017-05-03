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
var router_1 = require("@angular/router");
var GroupsComponent = (function () {
    function GroupsComponent(groupService, router) {
        this.groupService = groupService;
        this.router = router;
        this.groups = [];
    }
    GroupsComponent.prototype.ngOnInit = function () {
        this.loadAllGroups();
    };
    GroupsComponent.prototype.loadAllGroups = function () {
        var _this = this;
        this.groupService.getAll().subscribe(function (groups) { _this.groups = groups; });
    };
    GroupsComponent.prototype.onSelect = function (group) {
        this.currentGroup = group;
    };
    GroupsComponent.prototype.gotoGroupPage = function () {
        var id = "_id";
        this.router.navigate(['/template/group-page', this.currentGroup[id]]);
    };
    return GroupsComponent;
}());
GroupsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'groups',
        templateUrl: '/app/components/groups/groups.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [group_service_1.GroupService, router_1.Router])
], GroupsComponent);
exports.GroupsComponent = GroupsComponent;
//# sourceMappingURL=groups.component.js.map