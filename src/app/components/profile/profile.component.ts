import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { imgService } from '../../_services/img.service';
import { FriendRequestService } from '../../_services/friend-request.service';
import { FriendRequest } from '../../../friend-request';

import { User } from '../../../User';
import { UserService } from '../../_services/user.service';
import { Message } from '../../../Message';
import { MessageService } from '../../_services/message.service';
import { AlertService } from '../../_services/alert.service';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: User;
  currentUser: User;
  selectUser: User;
  friend: User;
  friends: User[];
  avatarPath: string;
  model: any = { messages: [] = [] };
  friendRequest: FriendRequest[] = [];
  modelRequest: any = {};
  msg: string;
  loading = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private location: Location,
    private imgS: imgService,
    private friendRequestService: FriendRequestService,
    private alertService: AlertService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  };


  ngOnInit() {
    this.loadUser();
    this.loadCurrentUser();
    this.loadMyFriends();
    this.getFriendRequests();
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
  }

  private loadCurrentUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  private userInFriends(id: any): boolean {
    for (var i = 0; i < this.currentUser.friends.length; i++) {
      if (this.currentUser.friends[i] == id) {
        return true;
      }
    }
    return false;
  }

  private getFriendRequests(): void {
    this.friendRequestService.getSentFriendRequest(this.currentUser["_id"]).subscribe(friendRequests => {
      this.friendRequest = friendRequests;
    });
  }

  private userInRequests(id: any): boolean {
    for (var i = 0; i < this.friendRequest.length; i++) {
      if (this.friendRequest[i].to == id) {
        return true;
      }
    }
    return false;
  }

  private getIdRequest(id: number): any {
    for (var i = 0; i < this.friendRequest.length; i++) {
      if (this.friendRequest[i].to == id) {
        return this.friendRequest[i]["_id"];
      }
    }
  }

  /*joinFriend(user: User): void {
    this.currentUser.friends.push(user["_id"]);
    user.friends.push(this.currentUser["_id"]);
    this.userService.update(user).subscribe(() => {
      this.loadMyFriends();
    });
    this.userService.update(this.currentUser).subscribe(() => {
      this.loadMyFriends();
    });
  }*/

  deleteRequest(_id: any) {
    this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(() => { this.getFriendRequests() });
  }

  leaveFriend(user: User): void {
    var indexCurrentUser = user.friends.indexOf(this.currentUser["_id"]);
    var indexUser = this.currentUser.friends.indexOf(user["_id"]);
    if (indexCurrentUser > -1) {
      this.currentUser.friends.splice(indexCurrentUser, 1);
    }
    if (indexUser > -1) {
      user.friends.splice(indexUser, 1);
    }
    this.userService.update(this.currentUser).subscribe(() => {
      this.loadMyFriends();
    });
    this.userService.update(user).subscribe(() => {
      this.loadMyFriends();
    });
  }

  sendRequest(): void {
    this.loading = true;
    this.modelRequest.from = this.currentUser["_id"];
    this.modelRequest.to = this.selectUser["_id"];
    this.modelRequest.msg = this.msg;
    console.log(this.modelRequest);
    this.friendRequestService.create(this.modelRequest)
      .subscribe(
      data => {
        this.alertService.success('Friend request sent succesful', true);
        this.getFriendRequests();
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });
    this.msg = "";
  }


  private loadUser(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getById(params["id"]))
      .subscribe(user => {
        this.user = user;
        this.avatarPath = this.imgS.getAvatarPath(this.user["_id"]);
      });
  }

  createMessage(user: User): void {
    this.loading = true;
    this.model.from = this.currentUser["_id"];
    this.model.to = user["_id"];
    this.model.messages.push({
      name: this.currentUser.name,
      when: new Date(),
      content: this.msg,
      read: false
    });
    this.messageService.create(this.model)
      .subscribe(
      data => {
        this.alertService.success('Message sent succesful', true);
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
      });
    this.msg = "";
  }

  onSelect(user: User): void {
    this.selectUser = user;
  }
}
