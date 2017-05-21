import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User }         from '../../../User';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';

@Component({
  selector: 'my-profile',
  templateUrl: './my-profile.component.html',
})

export class MyProfileComponent implements OnInit{
  user: User;
  currentUser: User;
  avatarPath: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private imgS: imgService
  ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.avatarPath = imgS.getAvatarPath(this.currentUser["_id"]);
      };


  ngOnInit() {
        this.loadUser();
    }

  private loadUser(){
      this.route.params
      .switchMap((params: Params) => this.userService.getById(this.currentUser["_id"]))
      .subscribe(user => this.user = user);
  }

  gotoEditProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/edit-profile', this.user[id]]);
  }
}
