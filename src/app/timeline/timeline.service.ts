import { Injectable } from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Url} from '../util/url';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {HttpEvent, HttpRequest} from '@angular/common/http';

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

  pushFileToStorage(id, file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/users/file/upload/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    // @ts-ignore
    return this.http.request(req);
  }

}
