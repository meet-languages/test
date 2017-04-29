import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../../User'

@Injectable()
export class UserService {
private usersUrl = 'http://localhost:4000/api/users';  // URL to web api
private userUrl = 'http://localhost:4000/api/user';  // URL to web api
private userUpdateUrl = 'http://localhost:4000/update-user';  // URL to web api
private headers = new Headers({ 'Content-Type': 'application/json' });

 /**
  * Constructor que reclama dependencias inyectables
  * Http se encuentra por haberse registrado en este módulo o en uno superior
  **/
constructor(private http: Http) {
  // su función es únicamente recibir las dependencias
}
getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(res => res.json() as User[])
      .catch(this.handleError);
  }

  getUser(id: number): Promise<User> {
    console.log("Voy a coger el usuario con: " + `${this.userUrl}/${id}`);
    const url = `${this.userUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  update(user: User): Promise<User> {
    const id = "";
    const url = `${this.userUrl}/${user["_id"]}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
  }

 private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
