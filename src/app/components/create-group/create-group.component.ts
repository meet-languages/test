import { Component, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_services/alert.service';
import { GroupService } from '../../_services/group.service';

@Component({
  moduleId: module.id,
  selector: 'create-group',
  templateUrl: '/app/components/create-group/create-group.component.html',
  styleUrls: ['/style/style.css']

})

@Injectable()
export class CreateGroupComponent { 
    model: any = { users: [] };

    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private groupService: GroupService,
        private router: Router,
        private alertService: AlertService) { }

    createGroup() {
        this.loading = true;
        this.groupService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Group create successful', true);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        this.router.navigate(['/template/groups']);
    }

}
