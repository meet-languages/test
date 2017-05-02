import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions, Response }  from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../../User';

@Injectable()
export class UserSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<User[]> {
      console.log("user-search.service");
        return this.http.get('http://localhost:4000/users/' + term, this.jwt()).map((response: Response) => response.json());
  }

  private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
