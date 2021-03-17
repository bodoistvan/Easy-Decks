import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token");
    console.log("fut az interceptor")
    if (idToken) {
        const cloned = req.clone({
            headers: req.headers.set("Authorization",
                "Bearer " + idToken)
        });

        return next.handle(cloned);
    }
    else {
        return next.handle(req);
    }
  }
}
