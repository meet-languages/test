import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
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
  currentUser: User;
    users: User[] = [];
 
    constructor(private userService: UserService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
 
    ngOnInit() {
        this.loadAllUsers();
    }
 
    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }
 
    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    onSelect(user: User): void {
      this.currentUser = user;
    }

    gotoProfile(): void {
      const id = "_id";
      this.router.navigate(['/template/profile', this.currentUser[id]]);
    }
  
}
