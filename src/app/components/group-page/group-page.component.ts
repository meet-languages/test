import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { imgService } from '../../_services/img.service';


import { User } from '../../../User';
import { UserService } from '../../_services/user.service';
import { Group } from '../../../Group';
import { GroupService } from '../../_services/group.service';
@Component({
  selector: 'group-page',
  templateUrl: './group-page.component.html',
})

export class GroupPageComponent implements OnInit {
  currentUser: User;
  group: Group;
  users: User[];
  user: User;
  creatorUser: User;
  avatarPaths: string[] = [];


  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private imgS: imgService
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };


  ngOnInit(): void {
    this.loadGroup();
    this.loadUser();
    this.loadMyUsers();
    // this.loadCreatorUser();
  }

  private loadGroup(): void {
    this.route.params
      .switchMap((params: Params) => this.groupService.getById(params["id"]))
      .subscribe(group => this.group = group);
  }

  private loadMyUsers() {
    this.route.params
      .switchMap((params: Params) => this.userService.getMyUsers(params["id"]))
      .subscribe(users => { this.users = users;
                            this.setAvatarPaths()
                          });
  }

  private setAvatarPaths(){
    this.users.forEach((item, index) => {
      this.avatarPaths[index] = this.imgS.getAvatarPath(this.users[index]['_id']);
    });
  }

  private loadUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(user => this.user = user);
  }

  deleteGroup(_id: string) {
    this.groupService.delete(_id).subscribe(() => { });
    this.router.navigate(['/template/groups']);
  }

  private userInGroup(id: any) {
    for (var i = 0; i < this.user.groups.length; i++) {
      if (this.user.groups[i] == id) {
        return true;
      }
    }
    return false;
  }

  private userInLikes(id: any) {
    for (var i = 0; i < this.group.likes.length; i++) {
      if (this.group.likes[i] == id) {
        return true;
      }
    }
    return false;
  }

  joinGroup(group: Group): void {
    this.user.groups.push(group["_id"]);
    this.group.users.push(this.user["_id"]);
    this.userService.update(this.user).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });
    this.groupService.update(this.group).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });

  }

  leaveGroup(group: Group): void {

    var indexUser = this.user.groups.indexOf(group["_id"]);
    var indexGroup = this.group.users.indexOf(this.user["_id"]);
    if (indexUser > -1) {
      this.user.groups.splice(indexUser, 1);
    }
    if (indexGroup > -1) {
      this.group.users.splice(indexGroup, 1);
    }
    this.userService.update(this.user).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });
    this.groupService.update(this.group).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });

    this.loadGroup();
    this.loadUser();
    this.loadMyUsers();

  }


  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }

  like(user: User): void {
    this.group.likes.push(user["_id"]);
    this.groupService.update(this.group).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });
  }

  disLike(user: User): void {
    var indexGroup = this.group.likes.indexOf(this.user["_id"]);
    if (indexGroup > -1) {
      this.group.likes.splice(indexGroup, 1);
    }
    this.groupService.update(this.group).subscribe(() => {
      this.loadGroup();
      this.loadUser();
      this.loadMyUsers();
    });
  }

  /*
      changeButton(this: any) {
        if (this.value==="Close Curtain") {
          this.value = "Open Curtain";}
        else {this.value = "Close Curtain"}
    }*/
}
