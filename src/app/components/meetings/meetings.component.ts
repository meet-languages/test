import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../../_services/meeting.service';
import { Meeting } from '../../../Meeting';
import { AuthHttp } from 'angular2-jwt'
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'meetings',
  templateUrl: '/app/components/meetings/meetings.component.html',
  styleUrls: ['/style/style.css']

})

export class MeetingsComponent implements OnInit {
    currentMeeting: Meeting;
    meetings: Meeting[] = [];
 
    constructor(private meetingService: MeetingService, private router: Router) { }
 
    ngOnInit() {
        this.loadAllMeetings();
    }
 
    private loadAllMeetings() {
        this.meetingService.getAll().subscribe(meetings => { this.meetings = meetings; });
    }

    onSelect(meeting: Meeting): void {
      this.currentMeeting = meeting;
    }

    gotoMeetingPage(): void {
      const id = "_id";
      this.router.navigate(['/template/meeting-page', this.currentMeeting[id]]);
    }
  
}
