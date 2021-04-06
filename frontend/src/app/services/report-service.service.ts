import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) {   }

  private baseUrl: string = "http://localhost:3000/api/reports"

  public getReceivedRerports():Observable<Report[]>{
      return this.http.get<Report[]>(`${this.baseUrl}/owner`).pipe(
        catchError(this.handleError<Report[]>("getReceivedRerports", [] ))
      )
  }

  public getSentReports():Observable<Report[]>{
    return this.http.get<Report[]>(`${this.baseUrl}/reportedBy`).pipe(
      catchError(this.handleError<Report[]>("getReceivedRerports", [] ))
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