import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserInfo } from '../interfaces/user-info';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   }

  private baseUrl: string = "http://localhost:3000/api/users"

  getUserInfo() : Observable<UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/info`).pipe(
      catchError(this.handleError<any>("getUserInfo"))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
