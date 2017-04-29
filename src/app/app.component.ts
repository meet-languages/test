import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {User} from '../User';

@Component({
  selector: 'my-app',
  template: `<router-outlet></router-outlet>`,
  providers: [UserService],
  styleUrls: ['/style/style.css']
})
export class AppComponent  {  }
