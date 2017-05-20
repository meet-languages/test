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
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var alert_service_1 = require("../../_services/alert.service");
var group_service_1 = require("../../_services/group.service");
var user_service_1 = require("../../_services/user.service");
var img_service_1 = require("../../_services/img.service");
var imgUploadComponent = (function () {
    function imgUploadComponent(imgService, route, groupService, userService, router, alertService) {
        this.imgService = imgService;
        this.route = route;
        this.groupService = groupService;
        this.userService = userService;
        this.router = router;
        this.alertService = alertService;
        this.model = { users: [], likes: [] };
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.users.push(this.currentUser["_id"]);
        this.message = "Select image to upload it";
    }
    /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and
   * makes an Http request with the image file.
   */
    imgUploadComponent.prototype.handleInputChange = function (event) {
        var _this = this;
        var image = event.target.files[0];
        this.imgService.upload(image).subscribe(function (data) {
            _this.alertService.success('Image upload succesful', true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
        this.message = "Image uploaded!";
    };
    return imgUploadComponent;
}());
imgUploadComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'imgupload',
        templateUrl: '/app/components/imgupload/imgupload.component.html',
        styleUrls: ['/style/style.css']
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [img_service_1.imgService,
        router_1.ActivatedRoute,
        group_service_1.GroupService,
        user_service_1.UserService,
        router_1.Router,
        alert_service_1.AlertService])
], imgUploadComponent);
exports.imgUploadComponent = imgUploadComponent;
//# sourceMappingURL=imgupload.component.js.map