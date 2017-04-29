import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User }         from '../../../User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit{
  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
// No funciona correctamente.
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params["id"]))
      .subscribe(user => this.user = user);
  }

  gotoEditProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/edit-profile', this.user[id]]);
  }
}
