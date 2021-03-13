import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deck } from '../interfaces/deck' 
import { DeckInfo } from '../interfaces/deck-info';
import { DeckWithCards } from '../interfaces/deck-with-cards';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = "http://localhost:3000/api"

  getDecks(): Observable<Deck[]>{
    return this.http.get<Deck[]>(`${this.baseUrl}/decks`).pipe(
      catchError(this.handleError<Deck[]>("getDecks", [])
    ))
  }

  getDeckInfoById(id:string){
    return this.http.get<DeckInfo>(`${this.baseUrl}/decks/${id}`).pipe(
      catchError(this.handleError<DeckInfo>("getDeckInfoByIderror")
    ))
  }
  
  getDeckInfoByIdAll(id:string){
    return this.http.get<DeckWithCards>(`${this.baseUrl}/decks/${id}/all`).pipe(
      catchError(this.handleError<DeckWithCards>("getDeckInfoByIdAll")
    ))
  }

  patchDeckById(id:string, deck:DeckWithCards){
    return this.http.patch<DeckWithCards>(`${this.baseUrl}/decks/${id}`, deck ).pipe(
      catchError(this.handleError<DeckWithCards>("patchingcard")
    ))
  }

  deleteDeckById(id:string){
    return this.http.delete<any>(`${this.baseUrl}/decks/${id}`).pipe(
      catchError(this.handleError<any>("deletingCard")
    ))
  }

  createDeck(deck: Deck) {
    return this.http.post<any>("http://localhost:3000/api/decks", deck);
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
