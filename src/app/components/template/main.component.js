"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TemplateComponent = (function () {
    function TemplateComponent() {
    }
    return TemplateComponent;
}());
TemplateComponent = __decorate([
    core_1.Component({
        selector: 'main',
        template: "<nav class=\"navbar navbar-default\">\n    <div class=\"container-fluid\">\n      <a href=\"#\">\n      <div class=\"navbar-left\">\n        <span class=\"navbar-brand brand-name\">\n        <img class=\"img-responsive2\" src=\"img/mlg.png\">\n        <h4 style=\"color: #ec7820\">MEETLANGUAGES</h4>\n        </span>\n      </div>\n      </a>\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#myNavbar\">\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n      <span class=\"icon-bar\"></span>\n    </button>\n\n\n      <div class=\"collapse navbar-collapse\" id=\"myNavbar\">\n        <ul class=\"nav navbar-nav navbar-right\">\n          <li class=\"active\"><a routerLink=\"/template/home\" routerLinkActive=\"active\">Home</a></li>\n          <li><a routerLink=\"/template/search\" routerLinkActive=\"active\">Search</a></li>\n          <li><a routerLink=\"/template/users\" routerLinkActive=\"active\">Members</a></li>\n          <li><a routerLink=\"/template/groups\" routerLinkActive=\"active\">Groups</a></li>\n          <li><a routerLink=\"/template/meetings\" routerLinkActive=\"active\">Meetings</a></li>\n           <li><a href=\"#\" [routerLink]=\"['/registry']\"><span class=\"glyphicon glyphicon-log-out\"></span> Log out</a></li>\n        </ul>\n      </div>\n    </div>\n  </nav>\n\n  <div class=\"container-fluid text-center\" id=\"form\">\n    <div class=\"col-sm-6 col-sm-offset-2 text-left well\">\n\n    <div>\n\n      <router-outlet></router-outlet>\n\n    </div>\n\n    </div>\n      <div class=\"col-sm-2\">\n        <panel-user></panel-user>\n      <div id=\"searchPanel\" class=\"well\">\n        <friends-online></friends-online>\n      </div>\n        <user-search></user-search>\n    </div>\n  </div>\n\n\n  <!-----------------------------------Social media---------------------------------->\n        <div id=\"mySidenav\" class=\"sidenav\" >\n          <a href=\"#\" id=\"facebook\">Facebook <img src=\"img/social/facebook.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"twitter\">Twitter <img src=\"img/social/twitter.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"linkedin\">Linkedin <img src=\"img/social/linkedin.png\" alt=\"\" class=\"imgSocial\"></a>\n          <a href=\"#\" id=\"github\">Github <img src=\"img/social/git.png\" alt=\"\" class=\"imgSocial\"></a>\n        </div>\n\n\n<footer class=\"container-fluid text-center\">\n  <p>\u00A9 2017 M e e t L a n g u a g e s</p>\n</footer>",
        providers: [],
        styleUrls: ['/style/style.css']
    })
], TemplateComponent);
exports.TemplateComponent = TemplateComponent;
//# sourceMappingURL=main.component.js.map