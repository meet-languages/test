import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User }         from '../../../User';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
})

export class EditProfileComponent implements OnInit{
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
// No funciona correctamente.
  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.userService.getUser(params["id"]))
      .subscribe(user => this.user = user);
  }

  save(): void {
    this.userService.update(this.user)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
