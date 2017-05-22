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
var user_service_1 = require("../../_services/user.service");
var message_service_1 = require("../../_services/message.service");
var TemplateComponent = (function () {
    function TemplateComponent(route, messageService, userService, router, alertService) {
        this.route = route;
        this.messageService = messageService;
        this.userService = userService;
        this.router = router;
        this.alertService = alertService;
        this.model = { prevMessage: null, };
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    TemplateComponent.prototype.sendMessage = function () {
        var _this = this;
        this.loading = true;
        this.model.owner = this.currentUser["_id"];
        //falta añadir usuario destino
        this.messageService.create(this.model)
            .subscribe(function (data) {
            _this.alertService.success('Message sended successfuly', true);
        }, function (error) {
            _this.alertService.error(error._body);
            _this.loading = false;
        });
    };
    return TemplateComponent;
}());
TemplateComponent = __decorate([
    core_1.Component({
        selector: 'main',
        template: "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n      <a href=\"#\">\n      <div class=\"navbar-left\">\n        <span class=\"navbar-brand brand-name\">\n        <img class=\"img-responsive2\" src=\"img/mlg.png\">\n        <h4 style=\"color: #ec7820\">MEETLANGUAGES</h4>\n        </span>\n      </div>\n      </a>\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n\n\n\n      <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li><a routerLink=\"/template/home\" routerLinkActive=\"active\">Home</a></li>\n          <li><a routerLink=\"/template/search\" routerLinkActive=\"active\">Search</a></li>\n          <li><a routerLink=\"/template/users\" routerLinkActive=\"active\">Members</a></li>\n          <li><a routerLink=\"/template/groups\" routerLinkActive=\"active\">Groups</a></li>\n          <li><a routerLink=\"/template/meetings\" routerLinkActive=\"active\">Meetings</a></li>\n           <li><a href=\"#\" [routerLink]=\"['/registry']\"><span class=\"glyphicon glyphicon-log-out\"></span> Log out</a></li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <div class=\"container-fluid text-center\" id=\"form\">\n    <div class=\"col-sm-6 col-sm-offset-2 text-left well\">\n\n    <div>\n\n      <router-outlet></router-outlet>\n\n    </div>\n\n    </div>\n    <!-- Message -->\n          <div class=\"modal fade\" id=\"myModal\" role=\"dialog\">\n            <div class=\"modal-dialog modal-sm\">\n              <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                  <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                  <h4 class=\"modal-title\">Write a message</h4>\n                </div>\n                <div class=\"modal-body\">\n                  <form>\n                    <textarea class=\"form-control noresize\" rows=\"5\" id=\"comment\" name=\"content\" [(ngModel)]=\"model.content\"></textarea>\n                  </form>\n                </div>\n                <div class=\"modal-footer\">\n                  <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\" (click)=\"sendMessage()\">Send</button>\n                  <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">Close</button>\n                </div>\n              </div>\n            </div>\n          </div>\n      <div class=\"col-sm-2\">\n        <panel-user></panel-user>\n      <div id=\"searchPanel\" class=\"well\">\n        <friends-online></friends-online>\n      </div>\n        <user-search></user-search>\n    </div>\n  </div>\n\n\n  <!-----------------------------------Social media---------------------------------->\n        <div id=\"mySidenav\" class=\"sidenav\" >\n          <a href=\"#\" id=\"facebook\">Facebook <img src=\"img/social/facebook.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"twitter\">Twitter <img src=\"img/social/twitter.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"linkedin\">Linkedin <img src=\"img/social/linkedin.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"github\">Github <img src=\"img/social/git.png\" alt=\"\" class=\"imgSocial\"></a>\n        </div>\n\n\n<footer class=\"container-fluid text-center\">\n  <p>\u00A9 2017 M e e t L a n g u a g e s</p>\n</footer>",
        providers: [message_service_1.MessageService],
        styleUrls: ['/style/style.css']
    }),
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.ActivatedRoute,
        message_service_1.MessageService,
        user_service_1.UserService,
        router_1.Router,
        alert_service_1.AlertService])
], TemplateComponent);
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=main.component.js.map