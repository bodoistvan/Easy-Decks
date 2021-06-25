import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient, private router:Router) { }

  private baseUrl:string = environment.API_URL + "/api/users";

  login(email:string, password:string ) {
    return this.http.post<any>(`${this.baseUrl}/login`, {email, password}).pipe(
      map(res => this.setSession(res)),
      catchError(this.handleError<any>("login"))
    )
        
  }
      
  private setSession(authResult:any) {
       //const expiresAt = moment().add(authResult.expiresIn,'second');
      const token = authResult.token;
      localStorage.setItem('token', token);
      //localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }          

  logout() {
      localStorage.removeItem("token");
      //localStorage.removeItem("expires_at");
      this.router.navigate(["login"]);

  }

  public isLoggedIn() {
      if ( !this.getTokenExist() )
        return false;
      return true 
      //moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
      return !this.isLoggedIn();
  }

  getTokenExist(){
    const token = localStorage.getItem("token");
    if ( !token )
      return false;
    return true; 
  }

  getExpiration() {
      //const expiration = localStorage.getItem("expires_at");
    // const expiresAt = JSON.parse(expiration);
      return "" //moment(expiresAt);
  } 

  registerUser(user: any){
    return this.http.post(this.baseUrl, user).pipe(
      catchError(this.handleError("register new user", {}))
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
