import { Input, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../_services/user.service';
import { User } from '../../../../User';
import { AuthHttp } from 'angular2-jwt';

@Component({
    moduleId: module.id,
    selector: 'search-users',
    templateUrl: '/app/components/search/search-users/search-users.component.html',
    styleUrls: ['/style/style.css']

})

export class SearchUsersComponent implements OnInit {
    currentUser: User;
    users: User[];


    constructor(private userService: UserService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.userService.getData().subscribe(
            (users: User[]) => {
                this.users = users;
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
