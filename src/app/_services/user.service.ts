import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../app.config';
import { User } from '../../User';

@Injectable()
export class UserService {
    constructor(private http: Http, private config: AppConfig) { }
    private usersSearch: User[];
    private subject: Subject<User[]> = new Subject();

    getAll() {
        return this.http.get(this.config.apiUrl + '/users', this.jwt()).map((response: Response) => response.json());
    }

    getMyUsers(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/my-users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    getMyFriends(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/my-friends/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    searchUsers(user: User) {
        return this.http.get(this.config.apiUrl + '/users/search-users/' + JSON.stringify(user), this.jwt()).map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
    }

    update(user: User) {
        return this.http.put(this.config.apiUrl + '/users/' + user["_id"], user, this.jwt());
    }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/users/' + _id, this.jwt());
    }

    getData(): Observable<User[]> {
        return this.subject.asObservable();
    }

    setData(usersSearch: User[]) {
        this.usersSearch = usersSearch;
        this.subject.next(usersSearch);
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