import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../../User';
import { Router } from '@angular/router';

@Component({
  selector: 'friends-online',
  template: `
  
      <h3>Friends online</h3>
      <hr>
      <div class="text-center" style="display: inline-block" *ngFor="let user of friends">
       <div class="text-center">
        <a style="cursor: pointer; margin-left: 10px" (click)="onSelect(user)" (click)="gotoProfile()">
        <img src="img/avatar.png" alt="avatar_meetlanguages" class="membersGroup" id="avatar"></a>
       </div>
       <div class="text-center text-muted medium">
        {{user.name}}
       </div>
      </div>

  `,
  styleUrls: ['/style/style.css']
})

export class FriendsOnlineComponent implements OnInit {
  currentUser: User;
  friends: User[];

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit() {
    this.loadMyFriends();
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
  }

  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }
}
