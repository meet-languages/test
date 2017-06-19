import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';
import { User } from '../../../User';
import { Message } from '../../../Message';
import { MessageService } from '../../_services/message.service';
import { AlertService } from '../../_services/alert.service';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'messages',
  templateUrl: '/app/components/messages/messages.component.html',
  styleUrls: ['/style/style.css']

})

export class MessagesComponent implements OnInit {
  currentUser: User;
  user: User;
  usersMsg: string[] = [];
  avatarPaths : { [key:number]:string; } = {};
  model: any = { messages: [] = [] };
  myMessages: any;
  msg: string;
  loading = false;

  constructor(private userService: UserService,
    private router: Router,
    private imgS: imgService,
    private messageService: MessageService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit() {
    this.loadCurrentUser();
    this.loadMyMessages();
  }

  private loadCurrentUser(): void {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  private loadNameUser(id: string): void {
    this.userService.getById(id)
      .subscribe( user => 
        this.usersMsg.push(user.name)
      );
  }

  private loadAvatar(id: string): void {
    this.avatarPaths[id] = this.imgS.getAvatarPath(id);
  }

  private loadMyMessages() {
    this.messageService.getMyMessages(this.currentUser["_id"]).subscribe(messages => {
      this.myMessages = messages;
      for (var i = 0; i < this.myMessages.length; i++) {
        this.loadAvatar(this.myMessages[i].to);
        this.loadAvatar(this.myMessages[i].from);
        if (this.myMessages[i].to === this.currentUser["_id"]) {
          this.loadNameUser(this.myMessages[i].from);
        }
        else {
          this.loadNameUser(this.myMessages[i].to);
        }
      }
    });
  }

  save(message: Message): void {
    message.messages.push({
      name: this.currentUser.name,
      when: new Date(),
      content: this.msg,
      read: false
    });
    this.messageService.update(message).subscribe(() => { this.loadMyMessages(); });
    this.msg = "";
  }

  makeRead(msgs: any): void {
    for (var i = 0; i < msgs.messages.length; i++) {
      msgs.messages[i].read = true;
    }
    this.messageService.update(msgs).subscribe(() => { this.loadMyMessages(); });
  }

  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }

}
