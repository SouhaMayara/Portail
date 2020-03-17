import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId;
  
  constructor(private http: HttpClient) { }

  login(form){
    return this.http.post('http://localhost:3001/auth/login',form);
  }

  getUser() {
    return this.http.get('http://localhost:3001/user/byUser/'+this.userId);
  }

  getArticle1(role) {
   // return this.http.get('http://localhost:3001/article/byUser/'+this.userId);
   return this.http.get('http://localhost:3001/article/byRole/'+role);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(jwt_decode(token));
      this.userId = jwt_decode(token).data._id;
      console.log(this.userId);
    }
  }

}
