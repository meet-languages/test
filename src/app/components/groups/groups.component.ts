import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../_services/group.service';
import { Group } from '../../../Group';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'groups',
  templateUrl: '/app/components/groups/groups.component.html',
  styleUrls: ['/style/style.css']

})

export class GroupsComponent implements OnInit {
    currentGroup: Group;
    groups: Group[] = [];
 
    constructor(private groupService: GroupService, private router: Router) { }
 
    ngOnInit() {
        this.loadAllGroups();
    }
 
    private loadAllGroups() {
        this.groupService.getAll().subscribe(groups => { this.groups = groups; });
    }

    onSelect(group: Group): void {
      this.currentGroup = group;
    }

    gotoGroupPage(): void {
      const id = "_id";
      this.router.navigate(['/template/group-page', this.currentGroup[id]]);
    }
  
}
