import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let myUserIdString:string|null = localStorage.getItem('userId');
      let myUserId:number = 0;
      if(myUserIdString)
        myUserId = +myUserIdString;

      if(!myUserId)
        return false;
      return true;
  }
  
}
