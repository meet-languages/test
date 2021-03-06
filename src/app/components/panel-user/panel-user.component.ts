import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';
import {imgService}                 from '../../_services/img.service';

import { User }         from '../../../User';
import { UserService } from '../../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'panel-user',
  templateUrl: 'panel-user.component.html'
})

export class PanelUserComponent implements OnInit{
  currentUser: User;
  users: User[] = [];
  avatarPath: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private imgS: imgService
  ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.avatarPath = imgS.getAvatarPath(this.currentUser['_id']);
      }



  ngOnInit() {
        this.loadAllUsers();
    }


  private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

  gotoProfile(): void {
      const id = "_id";
      this.router.navigate(['/template/my-profile', this.currentUser["_id"]]);
    }
}
