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
    friends: User[] = [];

    constructor(private userService: UserService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadCurrentUser();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadMyFriends() {
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
    }

    private loadCurrentUser() {
        this.userService.getById(this.currentUser["_id"])
            .subscribe(currentUser => this.currentUser = currentUser);
    }

    private userInFriends(id: any) {
        for (var i = 0; i < this.currentUser.friends.length; i++) {
            if (this.currentUser.friends[i] == id) {
                return true;
            }
        }
        return false;
    }

    joinFriend(user: User): void {
        this.currentUser.friends.push(user["_id"]);
        user.friends.push(this.currentUser["_id"]);
        this.userService.update(user).subscribe(() => {
            this.loadMyFriends();
        });
        this.userService.update(this.currentUser).subscribe(() => {
            this.loadMyFriends();
        });
        console.log(this.currentUser.friends);
    }

    leaveFriend(user: User): void {

        var indexCurrentUser = user.friends.indexOf(this.currentUser["_id"]);
        var indexUser = this.currentUser.friends.indexOf(user["_id"]);
        if (indexCurrentUser > -1) {
            this.currentUser.friends.splice(indexCurrentUser, 1);
        }
        if (indexUser > -1) {
            user.friends.splice(indexUser, 1);
        }
        this.userService.update(this.currentUser).subscribe(() => {
            this.loadMyFriends();
        });
        this.userService.update(user).subscribe(() => {
            this.loadMyFriends();
        });
    }

    onSelect(user: User): void {
        this.currentUser = user;
    }

    gotoProfile(): void {
        const id = "_id";
        this.router.navigate(['/template/profile', this.currentUser[id]]);
    }

}
