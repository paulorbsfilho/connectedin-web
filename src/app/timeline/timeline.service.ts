import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Url} from '../util/url';
import {catchError, map} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  constructor(private http: Http) {
  }

  findAllPosts() {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.get(Url.ADDRESS + Url.TIMELINE, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

  newPost(post) {
    const headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': window.localStorage.getItem('jwt')
      }
    );
    const options = new RequestOptions({headers: headers});
    return this.http.post(Url.ADDRESS + Url.POSTS + '/new', post, options).pipe(
      map((res: Response) => res.json().body),
      catchError((error: any) => observableThrowError(error.json().error || 'Server error')));
  }

}
