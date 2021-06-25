import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FlagInfo } from '../interfaces/flag-info';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FlagInfoService {

  private flagInfos:FlagInfo[] = [];
  private baseUrl = environment.API_URL + "/api/flaginfo";

  constructor (private http:HttpClient) {

  }

  public getFlagInfo():Observable<FlagInfo[]>{
      if (this.flagInfos.length == 0){
        console.log("not from cache");
        const response = this.http.get<FlagInfo[]>(this.baseUrl).pipe(catchError(this.handleError<FlagInfo[]>("query flaginfo", [])));
        response.subscribe(data=> this.flagInfos = data);
        return response;
      }
      console.log("from cache");
      return of(this.flagInfos);
      
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
