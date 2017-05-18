import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../../User';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'my-friends',
  templateUrl: '/app/components/my-friends/my-friends.component.html',
  styleUrls: ['/style/style.css']

})

export class MyFriendsComponent implements OnInit {
  currentUser: User;
  friends: User[];

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit() {
    this.loadCurrentUser();
    this.loadMyFriends();
    console.log(this.currentUser.friends);
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
  }

  private loadCurrentUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  leaveFriend(user: User): void {
    console.log(this.currentUser.friends, "\n", user.friends);
    var indexCurrentUser = user.friends.indexOf(this.currentUser["_id"]);
    var indexUser = this.currentUser.friends.indexOf(user["_id"]);
    if (indexCurrentUser > -1) {
      this.currentUser.friends.splice(indexCurrentUser, 1);
      this.friends.splice(indexCurrentUser, 1);
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
    console.log(this.currentUser.friends, "\n", user.friends);
  }

  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }

}