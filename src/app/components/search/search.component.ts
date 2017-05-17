import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../User';
import { UserService } from '../../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: '/app/components/search/search.component.html',
  styleUrls: ['/style/style.css']

})

export class SearchComponent implements OnInit {
  currentUser: User;
  users: User[];
  user: User;
  userToSearch: any = {
    nat_lang: null,
    lang_learn: null,
    sex: null
  };
  
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit(): void {
    this.loadUser();
    this.loadAllUsers();
  }


  private loadAllUsers() {
    this.userService.getAll().subscribe(users => { this.users = users; });
  }


  private loadUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(user => this.user = user);
  }


}
