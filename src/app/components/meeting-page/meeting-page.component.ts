import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../User';
import { UserService } from '../../_services/user.service';
import { Meeting } from '../../../Meeting';
import { MeetingService } from '../../_services/meeting.service';
@Component({
    selector: 'meeting-page',
    templateUrl: './meeting-page.component.html',
})

export class MeetingPageComponent implements OnInit {
    currentUser: User;
    meeting: Meeting;
    user: User;

    constructor(
        private meetingService: MeetingService,
        private userService: UserService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };


    ngOnInit() {
        this.loadMeeting();
        this.loadUser();
    }

    private loadMeeting() {
        this.route.params
            .switchMap((params: Params) => this.meetingService.getById(params["id"]))
            .subscribe(meeting => this.meeting = meeting);
    }

    private loadUser() {
        this.userService.getById(this.currentUser["_id"])
            .subscribe(user => this.user = user);
    }

    private userInLikes(id: any) {
        for (var i = 0; i <= this.meeting.likes.length; i++) {
            if (this.meeting.likes[i] == id) {
                return true;
            }
        }
        return false;
    }

    like(user: User): void {
        this.meeting.likes.push(user["_id"]);
        this.meetingService.update(this.meeting).subscribe(() => {
            this.loadMeeting();
            this.loadUser();
        });
    }

    disLike(user: User): void {
        var indexMeeting = this.meeting.likes.indexOf(this.user["_id"]);
        if (indexMeeting > -1) {
            this.meeting.likes.splice(indexMeeting, 1);
        }
        this.meetingService.update(this.meeting).subscribe(() => {
            this.loadMeeting();
            this.loadUser();
        });
    }
}
