import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import * as jwt_decode from 'jwt_decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId;
  //private _loginUrl="http://localhost:3001/auth/login";
  constructor(private http: HttpClient) { }

  /*loginUser(user){
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
    }
  }*/
  login(form){
    return this.http.post('http://localhost:3001/auth/login',form);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      //this.userId = jwt_decode(token).data._id;
    }
  }

}
