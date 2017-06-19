import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 
import { AppConfig } from '../app.config';
import { Message } from '../../Message';
import { User } from '../../User';
 
@Injectable()
export class MessageService {
    constructor(private http: Http, private config: AppConfig) { }
 
    getAll() {
        return this.http.get(this.config.apiUrl + '/messages', this.jwt()).map((response: Response) => response.json());
    }
 
    create(message: Message) {
        return this.http.post(this.config.apiUrl + '/messages/register', message, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/messages/' + _id, this.jwt());
    }

    getMyMessages(_id: string) {
        return this.http.get(this.config.apiUrl + '/messages/my-messages/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    update(message: Message) {
        return this.http.put(this.config.apiUrl + '/messages/' + message["_id"], message, this.jwt());
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