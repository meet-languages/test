import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../User';
import { Group } from '../../../Group';

import { AlertService } from '../../_services/alert.service';
import { GroupService } from '../../_services/group.service';
import { UserService } from '../../_services/user.service';

@Component({
    moduleId: module.id,
    selector: 'create-group',
    templateUrl: '/app/components/create-group/create-group.component.html',
    styleUrls: ['/style/style.css']

})

@Injectable()
export class CreateGroupComponent {
    currentUser: User;
    model: any = { users: [], likes: [] };
    groups: Group[];

    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private userService: UserService,
        private router: Router,
        private alertService: AlertService) {

        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model.users.push(this.currentUser["_id"]);
    }

    createGroup() {
        this.loading = true;
        this.model.creator_id = this.currentUser["_id"];
        this.model.creator_name = this.currentUser.name;
        this.groupService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('Group create successful', true);
                this.join();
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
        this.router.navigate(['/template/groups']);
    }

    private join() {
        this.groupService.getAll().subscribe(groups => {
        this.groups = groups;
            this.currentUser.groups.push(groups[groups.length - 1]["_id"]);
            this.userService.update(this.currentUser).subscribe(() => { });
        });
    }

}
