import {Injectable} from '@angular/core';
import {Headers, RequestOptions, Response, Http, RequestMethod} from '@angular/http';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
// import {Url} from '../util/url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
      });
    this.options = new RequestOptions({headers: this.headers});
  }

  doLogin(loginCredentials): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
    const options = new RequestOptions({method: RequestMethod.Post, headers: headers});
    return this.http.post(Url.ADDRESS + Url.LOGIN, loginCredentials, options).pipe(
      map((res: Response) => res.headers.get('Authorization').substring(7)));
  }

  doRegister(registerCredentials): Observable<any> {
    return this.http.post(Url.ADDRESS + Url.REGISTER,
      {
        email: registerCredentials.email,
        name: registerCredentials.name,
        password: registerCredentials.password
      },
      this.options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

}
