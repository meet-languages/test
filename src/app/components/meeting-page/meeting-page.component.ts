import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../User';
import { Meeting } from '../../../Meeting';
import { MeetingService } from '../../_services/meeting.service';
@Component({
    selector: 'meeting-page',
    templateUrl: './meeting-page.component.html',
})

export class MeetingPageComponent implements OnInit {
    currentUser: User;
    meeting: Meeting;

    constructor(
        private meetingService: MeetingService,
        private route: ActivatedRoute,
        private location: Location
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    };


    ngOnInit() {
        this.loadMeeting();
    }

    private loadMeeting() {
        this.route.params
            .switchMap((params: Params) => this.meetingService.getById(params["id"]))
            .subscribe(meeting => this.meeting = meeting);
    }
}
