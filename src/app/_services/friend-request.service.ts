import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { AppConfig } from '../app.config';
import { FriendRequest } from '../../friend-request';
import { User } from '../../User';
 
@Injectable()
export class FriendRequestService {
    constructor(private http: Http, private config: AppConfig) { }

    create(friendRequest: FriendRequest) {
        return this.http.post(this.config.apiUrl + '/friend-request/register', friendRequest, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/friend-request/' + _id, this.jwt());
    }

    getMyFriendRequest(_id: string) {
        return this.http.get(this.config.apiUrl + '/friend-request/my-friend-request/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    getSentFriendRequest(_id: string) {
        return this.http.get(this.config.apiUrl + '/friend-request/sent-friend-request/' + _id, this.jwt()).map((response: Response) => response.json());
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