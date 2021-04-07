import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Card } from '../interfaces/card';
import { Deck } from '../interfaces/deck' 
import { DeckInfo } from '../interfaces/deck-info';
import { DeckWithCards } from '../interfaces/deck-with-cards';

@Injectable({
  providedIn: 'root'
})
export class DecksService {

  constructor(private http: HttpClient) {}

  private baseUrl: string = "http://localhost:3000/api/decks"

  getDecks(objParams:any): Observable<Deck[]>{
    return this.http.get<Deck[]>(`${this.baseUrl}`, { params : objParams }).pipe(
      catchError(this.handleError<Deck[]>("getDecks", [])
    ))
  }

  getDeckInfoById(id:string){
    return this.http.get<DeckInfo>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<DeckInfo>("getDeckInfoByIderror")
    ))
  }
  
  getDeckInfoByIdAll(id:string, params?: HttpParams){
    console.log(params); 
    return this.http.get<DeckWithCards>(`${this.baseUrl}/${id}/all`, { params:params }).pipe(
      catchError(this.handleError<DeckWithCards>("getDeckInfoByIdAll")
    ))
  }

  patchDeckById(id:string, deck:DeckWithCards){
    return this.http.patch<DeckWithCards>(`${this.baseUrl}/${id}`, deck ).pipe(
      catchError(this.handleError<DeckWithCards>("patchingcard")
    ))
  }

  deleteDeckById(id:string){
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<any>("deletingCard")
    ))
  }

  createDeck(deck: Deck) {
    return this.http.post<any>(this.baseUrl, deck);
  }

  getDeckCards(id:string, filter:string, limit?:number){
    return this.http.get<Card[]>(`${this.baseUrl}/${id}/cards/${filter}`).pipe(
      catchError(this.handleError<Card[]>("getting deck cards", []))
    )
  }


  getDeckCardsStatistic(id:string, limit?:number){
    return this.http.get<Card[]>(`${this.baseUrl}/${id}/cards/statistic`).pipe(
      catchError(this.handleError<Card[]>("getting deck cards", []))
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
