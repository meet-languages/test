import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

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

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
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
      .subscribe(users => { this.users = users; });
  }

  private loadUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(user => this.user = user);
  }

  //private loadCreatorUser() {
  //  this.userService.getById(this.group.creator)
  //    .subscribe(creatorUser => this.creatorUser = creatorUser);
  //}

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

  joinGroup(group: Group): void {
    console.log(this.user.groups);
    if (this.userInGroup(group["_id"]) == false) {
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
  }

  leaveGroup(group: Group): void {

    if (this.userInGroup(group["_id"]) == true) {

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
  }


  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }

  /*
      changeButton(this: any) {
        if (this.value==="Close Curtain") {
          this.value = "Open Curtain";}
        else {this.value = "Close Curtain"}
    }*/
}
