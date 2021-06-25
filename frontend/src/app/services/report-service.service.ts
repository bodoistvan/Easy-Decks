import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../interfaces/report';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http: HttpClient) {   }

  private baseUrl: string = environment.API_URL + "/api/reports"

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

  public submitReport(id:string, status:string){
    console.log("report status: " + status);
    return this.http.post<any>(`${this.baseUrl}/${id}/${status}`, {}).pipe(
      catchError(this.handleError<any>("submitReport"))
    )
  }

  public createReport(report:any) {
    return this.http.post<any>(`${this.baseUrl}`, report).pipe(
      catchError(this.handleError<any>("createReport"))
    )
  }

  public deleteReport( id:string ){
    return this.http.delete<any>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError<any>("deleteReport"))
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
