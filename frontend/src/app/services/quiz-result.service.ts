import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QuizResult } from '../interfaces/quiz-result';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  private baseUrl:string = environment.API_URL + "/api/quizResults"
  constructor(private http:HttpClient) { }
  
  getQuizResultsByDeckId(id:string){
    return this.http.get<QuizResult[]>(`${this.baseUrl}/deck/${id}`).pipe(
      catchError(this.handleError<QuizResult[]>("getDeckInfoByIderror", [])
    ))
  }

  getLastQuizResultByDeckId(id:string){
    return this.http.get<QuizResult[]>(`${this.baseUrl}/deck/${id}/last`).pipe(
      
      catchError(this.handleError<QuizResult[]>("getDeckInfoByIderror" )
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
