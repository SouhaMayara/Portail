import { Injectable } from '@angular/core';
//import { CanActivate, Router } from '@angular/router';
//import { AuthService } from './auth.service';
//import { Observable } from 'rxjs';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (localStorage.getItem('token')) {
      return true
    }
    this.router.navigateByUrl('/login')
    return false;


  }

  //constructor(private _authService:AuthService,private _router: Router){ }


  /*canActivate(): boolean {
if (this._authService.loggedIn()) {
  return true
}else{
  this._router.navigate([''])
  return false
}}*/
  
  
  
}
