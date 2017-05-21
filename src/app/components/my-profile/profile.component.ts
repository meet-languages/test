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
  connectedUser: User;
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
        console.log(this.currentUser);};


  ngOnInit() {
        this.loadAllUsers();
        this.userService.getById(this.currentUser["_id"]).subscribe(connectedUser => { this.connectedUser = connectedUser; });
        console.log(this.connectedUser);
        this.route.params
        .switchMap((params: Params) => this.userService.getById(params["id"]))
        .subscribe( user => {this.user = user;
                    this.avatarPath = this.imgS.getAvatarPath(user["_id"]);
                    console.log("avatarpath set to "+this.avatarPath);
                  });


    }


  private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

  gotoEditProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/edit-profile', this.user[id]]);
  }
}
