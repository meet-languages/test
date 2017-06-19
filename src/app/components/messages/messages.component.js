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
var user_service_1 = require("../../_services/user.service");
var img_service_1 = require("../../_services/img.service");
var message_service_1 = require("../../_services/message.service");
var alert_service_1 = require("../../_services/alert.service");
var router_1 = require("@angular/router");
var MessagesComponent = (function () {
    function MessagesComponent(userService, router, imgS, messageService, alertService) {
        this.userService = userService;
        this.router = router;
        this.imgS = imgS;
        this.messageService = messageService;
        this.alertService = alertService;
        this.usersMsg = [];
        this.avatarPaths = {};
        this.model = { messages: [] };
        this.loading = false;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    ;
    MessagesComponent.prototype.ngOnInit = function () {
        this.loadCurrentUser();
        this.loadMyMessages();
    };
    MessagesComponent.prototype.loadCurrentUser = function () {
        var _this = this;
        this.userService.getById(this.currentUser["_id"])
            .subscribe(function (currentUser) { return _this.currentUser = currentUser; });
    };
    MessagesComponent.prototype.loadNameUser = function (id) {
        var _this = this;
        this.userService.getById(id)
            .subscribe(function (user) {
            return _this.usersMsg.push(user.name);
        });
    };
    MessagesComponent.prototype.loadAvatar = function (id) {
        this.avatarPaths[id] = this.imgS.getAvatarPath(id);
    };
    MessagesComponent.prototype.loadMyMessages = function () {
        var _this = this;
        this.messageService.getMyMessages(this.currentUser["_id"]).subscribe(function (messages) {
            _this.myMessages = messages;
            for (var i = 0; i < _this.myMessages.length; i++) {
                _this.loadAvatar(_this.myMessages[i].to);
                _this.loadAvatar(_this.myMessages[i].from);
                if (_this.myMessages[i].to === _this.currentUser["_id"]) {
                    _this.loadNameUser(_this.myMessages[i].from);
                }
                else {
                    _this.loadNameUser(_this.myMessages[i].to);
                }
            }
        });
    };
    MessagesComponent.prototype.save = function (message) {
        var _this = this;
        message.messages.push({
            name: this.currentUser.name,
            when: new Date(),
            content: this.msg,
            read: false
        });
        this.messageService.update(message).subscribe(function () { _this.loadMyMessages(); });
        this.msg = "";
    };
    MessagesComponent.prototype.makeRead = function (msgs) {
        var _this = this;
        for (var i = 0; i < msgs.messages.length; i++) {
            msgs.messages[i].read = true;
        }
        this.messageService.update(msgs).subscribe(function () { _this.loadMyMessages(); });
    };
    MessagesComponent.prototype.onSelect = function (user) {
        this.currentUser = user;
    };
    MessagesComponent.prototype.gotoProfile = function () {
        var id = "_id";
        this.router.navigate(['/template/profile', this.currentUser[id]]);
    };
    return MessagesComponent;
}());
MessagesComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'messages',
        templateUrl: '/app/components/messages/messages.component.html',
        styleUrls: ['/style/style.css']
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        router_1.Router,
        img_service_1.imgService,
        message_service_1.MessageService,
        alert_service_1.AlertService])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map