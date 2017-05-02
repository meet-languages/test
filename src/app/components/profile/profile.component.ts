import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }       from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';
import { Location }                 from '@angular/common';

import { User }         from '../../../User';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit{
  user: User;
  friend: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
      };
        
  
  ngOnInit() {
        this.loadUser(); 
    }

  private loadUser(){
      this.route.params
      .switchMap((params: Params) => this.userService.getById(params["id"]))
      .subscribe(user => this.user = user);
  }

 // addFriend(user: User): void {
 //   this.user.friends.push(this.friend["_id"]);
 //   this.userService.update(this.user).subscribe(() => { this.loadUser() });
 // }
 
}
