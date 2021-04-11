import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = "http://localhost:3000/api/cards"

  public updateCard(id: string, card:any){
    return this.http.patch<Card>(`${this.baseUrl}/${id}`, card).pipe(
      catchError(this.handleError<Card>("updateCard"))
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
