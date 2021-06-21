import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthInterceptorService } from '../auth-interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {

  constructor(private http: HttpClient) {   }

  private baseUrl: string = "http://localhost:3000/api/sounds"

  getCardSound( id:string, index: number) : Observable<ArrayBuffer> {
    return this.http.get(`${this.baseUrl}/card/${id}/${index}`, {responseType : 'arraybuffer'})
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
