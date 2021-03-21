import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardStatService {

  private baseUrl: string = "http://localhost:3000/api/cardStat"

  constructor(private http: HttpClient) { }

  bookMarkStat(cardId: string, value: boolean){
    console.log(value);
    return this.http.post<any>(`${this.baseUrl}/${cardId}/bookmark/${value}`, {} )
      .pipe(
        catchError(this.handleError<any>("bookmarkStat") 
      )
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
