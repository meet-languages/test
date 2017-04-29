import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../../User';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'users',
  templateUrl: '/app/components/users/users.component.html',
  styleUrls: ['/style/style.css']

})

export class UsersComponent implements OnInit {
  users: User[];
  currentUser: User;

  constructor(
    private router: Router,
    private userService: UserService) { }

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
  }

  ngOnInit(): void {
    this.getUsers();
  }

  onSelect(user: User): void {
    this.currentUser = user;
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.currentUser[id]]);
  }
  
}
