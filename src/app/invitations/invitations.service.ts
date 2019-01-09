import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Url} from '../util/url';
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationsService {

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
    return this.http.get(Url.ADDRESS + Url.INVITATIONS, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  changeStatus(id, status) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.put(Url.ADDRESS + Url.INVITATIONS + '?id=' + id + '&status=' + status, null, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

}
