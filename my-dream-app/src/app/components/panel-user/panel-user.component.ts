import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { User }         from '../../../User';
import { UserService } from '../../services/user.service';

@Component({
  moduleId: module.id,
  selector: 'panel-user',
  templateUrl: 'panel-user.component.html' 
})

export class PanelUserComponent{
  user: User;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
// No funciona correctamente.

 // ngOnInit(): void {
 //   this.route.params
 //     .switchMap((params: Params) => this.userService.getUser(params["id"]))
 //     .subscribe(user => this.user = user);
 // }
}

