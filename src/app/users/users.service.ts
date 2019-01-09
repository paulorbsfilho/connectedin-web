import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Url} from '../util/url';
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: Http) {
  }

  searchByName(name) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.get(Url.ADDRESS + Url.USERS + '?name=' + name, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  adminNew(user) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.post(Url.ADDRESS + Url.ADMIN + '/new', user, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

}
