import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { AppConfig } from '../app.config';
import { Meeting } from '../../Meeting';
import { User } from '../../User';
 
@Injectable()
export class MeetingService {
    constructor(private http: Http, private config: AppConfig) { }
 
    getAll() {
        return this.http.get(this.config.apiUrl + '/meetings', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/meetings/' + _id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(meeting: Meeting) {
        return this.http.post(this.config.apiUrl + '/meetings/register', meeting, this.jwt());
    }
 
    update(meeting: Meeting) {
        return this.http.put(this.config.apiUrl + '/meetings/' + meeting["_id"], meeting, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/meetings/' + _id, this.jwt());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}