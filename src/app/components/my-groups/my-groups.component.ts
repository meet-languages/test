import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../_services/group.service';
import { UserService } from '../../_services/user.service';
import { Group } from '../../../Group';
import { User } from '../../../User';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
    moduleId: module.id,
    selector: 'my-groups',
    templateUrl: '/app/components/my-groups/my-groups.component.html',
    styleUrls: ['/style/style.css']

})

export class MyGroupsComponent implements OnInit {
    currentUser: User;
    currentGroup: Group;
    groups: Group[] = [];

    constructor(private userService: UserService, private groupService: GroupService, private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };

    ngOnInit() {
        this.loadMyGroups();
        console.log(this.currentUser);
    }

    private loadMyGroups() {
        this.groupService.getMyGroups(this.currentUser["_id"]).subscribe(groups => { this.groups = groups; });
    }

    onSelect(group: Group): void {
        this.currentGroup = group;
    }

    gotoGroupPage(): void {
        const id = "_id";
        this.router.navigate(['/template/group-page', this.currentGroup[id]]);
    }

}