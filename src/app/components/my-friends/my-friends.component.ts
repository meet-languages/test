import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';
import { User } from '../../../User';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-friends',
  templateUrl: '/app/components/my-friends/my-friends.component.html',
  styleUrls: ['/style/style.css']

})

export class MyFriendsComponent implements OnInit {
  currentUser: User;
  friends: User[];
  avatarPaths: string[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private imgS: imgService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit() {
    this.loadCurrentUser();
    this.loadMyFriends();
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; 
                                                                                  this.setAvatarPaths();});
  }

  private loadCurrentUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(currentUser => this.currentUser = currentUser);
  }

  private setAvatarPaths() {
    this.friends.forEach((item, index) => {
      this.avatarPaths[index] = this.imgS.getAvatarPath(this.friends[index]['_id']);
    });
  }

  leaveFriend(user: User): void {
    var indexCurrentUser = this.currentUser.friends.indexOf(user["_id"]);
    var indexUser = user.friends.indexOf(this.currentUser["_id"]);
    if (indexCurrentUser > -1) {
      this.currentUser.friends.splice(indexCurrentUser, 1);
    }
    if (indexUser > -1) {
      user.friends.splice(indexUser, 1);
    }
    this.userService.update(this.currentUser).subscribe(() => {
      this.loadMyFriends();
      this.loadCurrentUser();
    });
    this.userService.update(user).subscribe(() => {
      this.loadMyFriends();
      this.loadCurrentUser();
    });
  }

  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }

}