import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId;
  role: string;
  articles: any;
  professeurId: any;
  
  constructor(private http: HttpClient) { }

  login(form){
    return this.http.post('http://localhost:3001/auth/login',form);
  }

  getu(id) {
    return this.http.get('http://localhost:3001/user/byUser/'+id);
  }

  getUser() {
    return this.http.get('http://localhost:3001/user/byUser/'+this.userId);
  }

  getArticle1() {
   // return this.http.get('http://localhost:3001/article/byUser/'+this.userId);
   return this.http.get('http://localhost:3001/article/byRole/'+this.role);
  }

  getArticles(){
    return this.http.get('http://localhost:3001/article/articles');
  }
  updateUser(userId, profile) {
    return this.http.post('http://localhost:3001/user/updateProfile/' + userId, profile);
  }
  getUserInG(){
    return this.http.get('http://localhost:3001/seance/etudiant/'+ this.userId);
  }
  
  getSeance(idG){
    return this.http.get('http://localhost:3001/seance/byId/'+idG);
  }
  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(jwt_decode(token));
      this.userId = jwt_decode(token).data._id;
      this.professeurId = jwt_decode(token).data.professeur;
      console.log(this.userId);
    }
  }

}
