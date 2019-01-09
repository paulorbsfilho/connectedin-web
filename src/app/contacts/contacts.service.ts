import {Injectable} from '@angular/core';
import {Headers, Http, RequestMethod, RequestOptions, Response} from '@angular/http';
import {Url} from '../util/url';
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: Http) {
  }

  findAll() {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.get(Url.ADDRESS + Url.CONTACTS, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  contactDetail(email) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.get(Url.ADDRESS + Url.DETAIL + '?email=' + email, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  invite(email) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.post(Url.ADDRESS + Url.INVITE + '?email=' + email, null, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  undoFriendship(id) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.delete(Url.ADDRESS + Url.CONTACTS + '?id=' + id, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  blockContact(id) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.put(Url.ADDRESS + Url.CONTACTS + '/block?id=' + id, null, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  passwordUpdate(passwordUpdate) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.put(Url.ADDRESS + Url.PASSWORD + '/update', passwordUpdate, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

}
