import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { User } from '../../../User';
import { imgService } from '../../_services/img.service';
import { Router } from '@angular/router';

@Component({
  selector: 'friends-online',
  template: `
  
      <h3>Friends online</h3>
      <hr>
      <div class="text-center" style="display: inline-block  margin: 10px;" *ngFor="let user of friends; let i = index;">
       <div class="text-center">
        <a style="cursor: pointer; margin-left: 10px" (click)="onSelect(user)" (click)="gotoProfile()">
          <img src="{{avatarPaths[i]}}" (error)="avatarPaths[i]=this.imgS.getDefaultAvatarPath();" alt="avatar_meetlanguages" class="imp-responsive4 membersGroup" id="avatar" title="" data-toggle="popover" data-content="Language I want to learn: English Language: Spanish" data-trigger="hover" data-original-title="Nombre Apellido"></a>
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
  avatarPaths: string[] = [];

  constructor(private userService: UserService,
    private router: Router,
    private imgS: imgService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit() {
    this.loadMyFriends();
  }

  private loadMyFriends() {
    this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => {
    this.friends = friends;
      this.setAvatarPaths();
    });
  }

  private setAvatarPaths() {
    this.friends.forEach((item, index) => {
      this.avatarPaths[index] = this.imgS.getAvatarPath(this.friends[index]['_id']);
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
