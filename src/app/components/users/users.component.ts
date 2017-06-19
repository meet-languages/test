import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { imgService } from '../../_services/img.service';
import { FriendRequestService } from '../../_services/friend-request.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../../User';
import { FriendRequest } from '../../../friend-request';
import { AuthHttp } from 'angular2-jwt';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'users',
    templateUrl: '/app/components/users/users.component.html',
    styleUrls: ['/style/style.css']

})

export class UsersComponent implements OnInit {
    currentUser: User;
    selectUser: User;
    msg: string;
    modelRequest: any = {};
    users: User[] = [];
    friends: User[] = [];
    friendRequest: FriendRequest[] = [];
    avatarPaths: string[] = [];
    loading = false;

    constructor(private userService: UserService,
        private router: Router,
        private imgS: imgService,
        private friendRequestService: FriendRequestService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
        this.loadCurrentUser();
        this.loadMyFriends();
        this.getFriendRequests();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => {
            this.users = users;
            this.setAvatarPaths()
        });
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

    private setAvatarPaths() {
        this.users.forEach((item, index) => {
            this.avatarPaths[index] = this.imgS.getAvatarPath(this.users[index]['_id']);
        });
        console.log(this.avatarPaths);
    }

    private getFriendRequests(): void {
        this.friendRequestService.getSentFriendRequest(this.currentUser["_id"]).subscribe(friendRequests => {
            this.friendRequest = friendRequests;
        });
    }

    private userInRequests(id: any): boolean {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return true;
            }
        }
        return false;
    }

    private getIdRequest(id: number): any {
        for (var i = 0; i < this.friendRequest.length; i++) {
            if (this.friendRequest[i].to == id) {
                return this.friendRequest[i]["_id"];
            }
        }
    }

    deleteRequest(_id: any) {
        this.friendRequestService.delete(this.getIdRequest(_id)).subscribe(() => { this.getFriendRequests() });
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

    sendRequest(): void {
        this.loading = true;
        this.modelRequest.from = this.currentUser["_id"];
        this.modelRequest.to = this.selectUser["_id"];
        this.modelRequest.msg = this.msg;
        this.friendRequestService.create(this.modelRequest)
            .subscribe(
            data => {
                this.alertService.success('Friend request sent succesful', true);
                this.getFriendRequests();
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.msg = "";
    }


    onSelect(user: User): void {
        this.selectUser = user;
    }

    gotoProfile(): void {
        const id = "_id";
        this.router.navigate(['/template/profile', this.selectUser[id]]);
    }

}
