import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../../User';
import { UserService } from '../../../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'search-users',
  templateUrl: '/app/components/search/search-users/search-users.component.html',
  styleUrls: ['/style/style.css']

})

export class SearchUsersComponent implements OnInit {
  currentUser: User;
  users: User[];
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser);
  };

  ngOnInit(): void {
    this.loadUser();
    this.loadMyUsers();
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


}
