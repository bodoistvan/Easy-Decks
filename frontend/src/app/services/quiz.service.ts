import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Quiz } from '../interfaces/quiz';
import { QuizQuestion } from '../interfaces/quiz-question';
import { QuizQuestionResult } from '../interfaces/quiz-question-result';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) {   }

  private baseUrl: string = "http://localhost:3000/api/quizes"

  getQuizQuestionsById(id:string){
    return this.http.get<Quiz>( `${this.baseUrl}/${id}`  ).pipe(
      catchError(this.handleError<Quiz>("getting quiz questions"))
    )
  }

  answerQuizQuestion(id: string, answer: QuizQuestion){
    return this.http.post<QuizQuestionResult>( `${this.baseUrl}/${id}`, answer ).pipe(
      catchError(this.handleError<QuizQuestionResult>("answer quiz questions"))
    )
  }

  getQuizInprogress( deckId:string ){
    return this.http.get<Quiz>(`${this.baseUrl}/inprogress/${deckId}`).pipe(
      catchError(this.handleError<Quiz>("getQuizInprogress") )
    )
  }

  createQuiz( body: any){
    return this.http.post<any>(`${this.baseUrl}/create`, body).pipe(
      catchError(this.handleError<any>("creating quiz"))
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
