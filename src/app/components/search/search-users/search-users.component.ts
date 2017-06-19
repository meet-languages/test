import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../../User';
import { imgService } from '../../../_services/img.service';
import { FriendRequest } from '../../../../friend-request';
import { FriendRequestService } from '../../../_services/friend-request.service';

@Component({
    moduleId: module.id,
    selector: 'search-users',
    templateUrl: '/app/components/search/search-users/search-users.component.html',
    styleUrls: ['/style/style.css']

})

export class SearchUsersComponent implements OnInit {
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
        private route: ActivatedRoute,
        private location: Location,
        private imgS: imgService,
        private friendRequestService: FriendRequestService,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getData().subscribe(
            (users: User[]) => {
                this.users = users;
                this.setAvatarPaths();
            });
        this.loadMyFriends();
        this.getFriendRequests();
    }

    private loadMyFriends() {
        this.userService.getMyFriends(this.currentUser["_id"]).subscribe(friends => { this.friends = friends; });
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

    private loadCurrentUser() {
        this.userService.getById(this.currentUser["_id"])
            .subscribe(currentUser => this.currentUser = currentUser);
    }

    private getFriendRequests(): void {
        this.friendRequestService.getSentFriendRequest(this.currentUser["_id"]).subscribe(friendRequests => {
            this.friendRequest = friendRequests;
        });
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
                this.getFriendRequests();
            },
            error => {
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
