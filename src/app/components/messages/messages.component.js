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
var message_service_1 = require("../../_services/message.service");
var router_1 = require("@angular/router");
var MessagesComponent = (function () {
    function MessagesComponent(messageService, router) {
        this.messageService = messageService;
        this.router = router;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this.loadAllMessages();
    };
    MessagesComponent.prototype.loadAllMessages = function () {
        var _this = this;
        this.messageService.getMyMessages().subscribe(function (messages) { _this.messages = messages; });
    };
    MessagesComponent.prototype.onSelect = function (message) {
        this.currentMessage = message;
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
    __metadata("design:paramtypes", [message_service_1.MessageService, router_1.Router])
], MessagesComponent);
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=messages.component.js.map