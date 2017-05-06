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
  users: User;

  constructor(
    private groupService: GroupService,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };


  ngOnInit() {
    this.loadGroup();
    this.loadMyUsers();
  }

  private loadGroup() {
    this.route.params
      .switchMap((params: Params) => this.groupService.getById(params["id"]))
      .subscribe(group => this.group = group);
  }

  private loadMyUsers() {
    this.route.params
      .switchMap((params: Params) => this.userService.getMyUsers(params["id"]))
      .subscribe(users => { this.users = users; });
  }

  joinGroup(group: Group): void {
    var contains: any = function (id: any, user: User) {
      for (var i = 0; i < user.groups.length; i++) {
        if (contains(user.groups[i])) return true;
      }
      return false;
    };

    if (contains(group["_id"], this.currentUser) == false) {
      this.currentUser.groups.push(group["_id"]);
      this.group.users.push(this.currentUser["_id"]);
      this.userService.update(this.currentUser).subscribe(() => { });
      this.groupService.update(this.group).subscribe(() => { });
      this.loadGroup();
    }


  }
  /*
      changeButton(this: any) {
        if (this.value==="Close Curtain") {
          this.value = "Open Curtain";}
        else {this.value = "Close Curtain"}
    }*/
}
