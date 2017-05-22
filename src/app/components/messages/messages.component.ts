import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../_services/message.service';
import { Message } from '../../../Message';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'messages',
  templateUrl: '/app/components/messages/messages.component.html',
  styleUrls: ['/style/style.css']

})

export class MessagesComponent implements OnInit {
  messages: Message[];
  currentMessage: Message;

  constructor(private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.loadAllMessages();
  }

  private loadAllMessages() {
    this.messageService.getMyMessages().subscribe(messages => { this.messages = messages; });
  }

  onSelect(message: Message): void {
    this.currentMessage = message;
  }

}