import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { AppConfig } from '../app.config';
import { Group } from '../../Group';
import { User } from '../../User';
 
@Injectable()
export class GroupService {
    constructor(private http: Http, private config: AppConfig) { }
 
    getAll() {
        return this.http.get(this.config.apiUrl + '/groups', this.jwt()).map((response: Response) => response.json());
    }

    getMyGroups(_id: string) {
        return this.http.get(this.config.apiUrl + '/groups/my-groups/' + _id, this.jwt()).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/groups/' + _id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(group: Group) {
        return this.http.post(this.config.apiUrl + '/groups/register', group, this.jwt());
    }
 
    update(group: Group) {
        return this.http.put(this.config.apiUrl + '/groups/' + group["_id"], group, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/groups/' + _id, this.jwt());
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