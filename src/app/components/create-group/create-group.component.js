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
var router_1 = require("@angular/router");
var alert_service_1 = require("../../_services/alert.service");
var group_service_1 = require("../../_services/group.service");
var CreateGroupComponent = (function () {
    function CreateGroupComponent(route, groupService, router, alertService) {
        this.route = route;
        this.groupService = groupService;
        this.router = router;
        this.alertService = alertService;
        this.model = { users: [] };
        this.loading = false;
    }
    CreateGroupComponent.prototype.createGroup = function () {
        var _this = this;
        this.loading = true;
        this.groupService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Group create successful', true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return CreateGroupComponent;
}());
CreateGroupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'create-group',
        templateUrl: '/app/components/create-group/create-group.component.html',
        styleUrls: ['/style/style.css']
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        group_service_1.GroupService,
        router_1.Router,
        alert_service_1.AlertService])
], CreateGroupComponent);
exports.CreateGroupComponent = CreateGroupComponent;
//# sourceMappingURL=create-group.component.js.map