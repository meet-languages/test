import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';
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
    selectUser: User;
    users: User[] = [];
    friends: User[] = [];
    avatarPaths: string[] = [];

    constructor(private userService: UserService,
                private router: Router,
                private imgS: imgService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadCurrentUser();
        this.loadMyFriends();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users;
                                                       this.setAvatarPaths()});
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

    private setAvatarPaths(){
      this.users.forEach((item, index) => {
        this.avatarPaths[index] = this.imgS.getAvatarPath(this.users[index]['_id']);
      });
    }

    joinFriend(user: User): void {
        this.currentUser.friends.push(user["_id"]);
        user.friends.push(this.currentUser["_id"]);
        this.userService.update(user).subscribe(() => {
            this.loadMyFriends();
            this.loadCurrentUser();
        });
        this.userService.update(this.currentUser).subscribe(() => {
            this.loadMyFriends();
            this.loadCurrentUser();
        });
    }

    leaveFriend(user: User): void {
        var indexCurrentUser = this.currentUser.friends.indexOf(user["_id"]);
        var indexUser = user.friends.indexOf(this.currentUser["_id"]);
        if (indexCurrentUser > -1) {
            this.currentUser.friends.splice(indexCurrentUser, 1);
        }
        if (indexUser > -1) {
            user.friends.splice(indexUser, 1);
        }
        this.userService.update(this.currentUser).subscribe(() => {
            this.loadMyFriends();
            this.loadCurrentUser();
        });
        this.userService.update(user).subscribe(() => {
            this.loadMyFriends();
            this.loadCurrentUser();
        });
    }

    onSelect(user: User): void {
        this.selectUser = user;
    }

    gotoProfile(): void {
        const id = "_id";
        this.router.navigate(['/template/profile', this.selectUser[id]]);
    }

}
