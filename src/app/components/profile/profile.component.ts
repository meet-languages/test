import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../User';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  user: User;
  currentUser: User;
  friend: User;
  friends: User[];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
  };


  ngOnInit() {
    this.loadUser();
    this.loadCurrentUser();
    this.loadMyFriends();
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
  }

  private loadCurrentUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  private userInFriends(id: any) {
    for (var i = 0; i < this.currentUser.friends.length; i++) {
      if (this.currentUser.friends[i] == id) {
        return true;
      }
    }
    return false;
  }

  joinFriend(user: User): void {
    this.currentUser.friends.push(user["_id"]);
    user.friends.push(this.currentUser["_id"]);
    this.userService.update(user).subscribe(() => {
      this.loadMyFriends();
    });
    this.userService.update(this.currentUser).subscribe(() => {
      this.loadMyFriends();
    });
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

  private loadUser() {
    this.route.params
      .switchMap((params: Params) => this.userService.getById(params["id"]))
      .subscribe(user => this.user = user);
  }

  // addFriend(user: User): void {
  //   this.user.friends.push(this.friend["_id"]);
  //   this.userService.update(this.user).subscribe(() => { this.loadUser() });
  // }

}
