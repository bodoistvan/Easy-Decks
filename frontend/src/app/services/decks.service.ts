import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deck } from '../interfaces/deck' 

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) {}

  getDecks(): Observable<Deck[]>{
    return this.http.get<Deck[]>("http://localhost:3000/decks").pipe(
      catchError(this.handleError<Deck[]>("getDecks", [])
    ))
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
