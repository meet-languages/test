// components/registry.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import { User } from '../../../User'

@Component({
  selector: 'registry',
  templateUrl: `./registry.component.html`,
  providers: [AuthService]
})
export class RegistryComponent {
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

    onSubmit(user: User): Promise<User> {
    const id = "";
    const url = `http://localhost:4000/sessions`;
    return this.http
      .post(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}