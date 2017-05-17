import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../../User';
import { UserService } from '../../../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'search-form',
  templateUrl: '/app/components/search/search-form/search-form.component.html',
  styleUrls: ['/style/style.css']

})

export class SearchFormComponent implements OnInit {

  users: User[];
  currentUser: User;
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
    private location: Location,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  };

  ngOnInit(): void {
    this.loadUser();
  }


  searchUsers() {
    this.userService.searchUsers(this.userToSearch)
      .subscribe(users => { this.users = users;this.setData(users); });
    this.gotoSearchUsers();
  }


  private loadUser() {
    this.userService.getById(this.currentUser["_id"])
      .subscribe(user => this.user = user);
  }

  gotoSearchUsers(): void {
    this.router.navigate(['/template/search/search-users'], "Asdawdasd");
  }

  setData(users: User[]) {
    console.log(users);
    this.userService.setData(this.users);
  }

}
