import { Component, OnInit } from '@angular/core';
import { FriendRequestService } from '../../_services/friend-request.service';
import { FriendRequest } from '../../../friend-request';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../../User';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'notifications',
  templateUrl: '/app/components/notifications/notifications.component.html',
  styleUrls: ['/style/style.css']

})

export class NotificationsComponent implements OnInit {

  currentUser: User;
  user: User;
  friendRequest: FriendRequest[] = [];
  usersRequest: string[] = [];
  avatarPaths: { [key: number]: string; } = {};
  friends: User[] = [];
  loading = false;

  constructor(private userService: UserService,
    private router: Router,
    private imgS: imgService,
    private friendRequestService: FriendRequestService,
    private alertService: AlertService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadCurrentUser();
    this.loadFriendRequests();
    this.loadMyFriends();
  }

  private loadCurrentUser(): void {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  private loadUser(id: string): void {
    this.userService.getById(id)
      .subscribe(user => this.user = user);
  }

  private loadAvatar(id: string): void {
    this.avatarPaths[id] = this.imgS.getAvatarPath(id);
  }

  private loadFriendRequests(): void {
    this.friendRequestService.getMyFriendRequest(this.currentUser["_id"]).subscribe(friendRequests => {
      this.friendRequest = friendRequests;
      this.loadNameUser();
    });
  }

  private loadMyFriends(): void {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
  }

  private getIdRequest(id: number): any {
    for (var i = 0; i < this.friendRequest.length; i++) {
      if (this.friendRequest[i].from == id) {
        return this.friendRequest[i]["_id"];
      }
    }
  }

  private loadNameUser(): void {
    this.usersRequest = [];
    for (var i = 0; i < this.friendRequest.length; i++) {
      this.loadAvatar(this.friendRequest[i].from.toString());
      this.userService.getById(this.friendRequest[i].from.toString())
        .subscribe(user =>
          this.usersRequest.push(user.name)
        );
    }
  }

  joinFriend(idUser: string): void {
    this.userService.getById(idUser)
      .subscribe(
      user => {
        this.user = user;
        this.user.friends.push(this.currentUser["_id"]);
        this.userService.update(this.user).subscribe(() => {
          this.loadMyFriends();
          this.loadCurrentUser();
        });
      }
      );
      
    this.currentUser.friends.push(idUser);
    this.userService.update(this.currentUser).subscribe(() => {
      this.loadMyFriends();
      this.loadCurrentUser();
    });
    this.deleteRequest(idUser);
    this.loadNameUser();
  }

  deleteRequest(_id: any): void {
    this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(() => { this.loadFriendRequests() });
    this.loadNameUser();
  }
}