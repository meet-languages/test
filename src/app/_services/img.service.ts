import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { Group } from '../../Group';
import { User } from '../../User';

@Injectable()
export class imgService {
    constructor(private http: Http, private config: AppConfig) { }

    upload(image: File){
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      var formData = new FormData();
      formData.append('profilePicture', image, "filename");
      formData.append('userid', currentUser["_id"]);

      return this.http.post(this.config.apiUrl + '/images/upload', formData, this.jwt());
    }


    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token});
            //,'Content-Type':'application/json'
            return new RequestOptions({ headers: headers });
        }
    }
}
