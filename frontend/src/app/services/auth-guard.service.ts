import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouteReuseStrategy, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router:Router, private authService:AuthService) { }
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.authService.isLoggedOut()){
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
