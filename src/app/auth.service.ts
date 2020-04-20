import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Absence } from "../../node/models/absence";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  userId;
  role: string;
  articles: any;
  professeurId: any;
  image: any;
  fd =new FormData();

  
  constructor(private http: HttpClient, private _router : Router) { }

  login(form){
    return this.http.post('http://localhost:3001/auth/login',form);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/']);
    console.log("logout");
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
    return this.http.post('http://localhost:3001/user/updateProfile/' + userId,profile);
  }

  updatePhoto( userId, fd) {
    return this.http.post('http://localhost:3001/user/updateProfileImage/' + userId,fd);
  }

  getUserInG(){
    return this.http.get('http://localhost:3001/seance/etudiant/'+ this.userId);
  }
  getUsersInG(idGrp){
    return this.http.get('http://localhost:3001/seance/etudiants/'+idGrp);
  }
  getSeance(idG){
    return this.http.get('http://localhost:3001/seance/byId/'+idG);
  }
  getGroupeById(idG){
    return this.http.get('http://localhost:3001/seance/getGroupeById/'+idG);
  }
  //get prof by IdUser
  getProfId(){
      return this.http.get('http://localhost:3001/user/Prof/'+ this.userId);
  }
  //get Matiere By Prof
  getMatiereByProf(idP){
    return this.http.get('http://localhost:3001/matiere/getMatByProf/'+idP);
  }
  //get Groupe by Matiere
  getGroupesByMat(idMat){
    return this.http.get('http://localhost:3001/matiere/getGrpByMat/'+idMat);
  }

    //pour emploi du prof
  getSeancesByProf(idP){
    //console.log("userId*******",this.userId);
    return this.http.get('http://localhost:3001/seance/seances/'+idP);
  }
  getGroupBySeance(ids,idp){
    //console.log('http://localhost:3001/seance/seance/'+ids+"/"+ idp);
    return this.http.get('http://localhost:3001/seance/seance/'+ids+'/'+idp);
  }
  // Seance courante pour un prof
  getSeanceByProf(idP,j,s){
    //console.log('http://localhost:3001/seance/seancesCourant/'+idP+"/"+ j+"/"+s);
    return this.http.get('http://localhost:3001/seance/seancesCourant/'+idP+"/"+ j+"/"+s);
  }

  addAbsence(idMat,idS,idEt,dateAbs){
    return this.http.post('http://localhost:3001/matiere/addAbs/'+idMat+'/'+idS+'/'+idEt+'/'+dateAbs,Absence);
  }

  getAbsence(idMat,idS,idEt){
    return this.http.get('http://localhost:3001/matiere/Abs/'+idMat+'/'+idS+'/'+idEt);
  }

  decodeToken() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      console.log(jwt_decode(token));
      this.userId = jwt_decode(token).data._id;
      this.image=jwt_decode(token).data.image
      this.professeurId = jwt_decode(token).data.professeur;
      console.log(this.userId);
    }
  }



  getMatiere(idG){
    return this.http.get('http://localhost:3001/matiere/getByGrp/'+idG);
  }
 
  getMatiereById(idm){
    return this.http.get('http://localhost:3001/matiere/getBy/'+idm);
  }
  getMatiereByIdProf(idPro){
    return this.http.get('http://localhost:3001/matiere/getMatByProf/'+idPro);
  }

  getTypeMat(idMat,idGrp,idProf){
    return this.http.get('http://localhost:3001/matiere/getTypeMat/'+idMat+'/'+idGrp+'/'+idProf);
  }

  getNote(ids,idm){
    return this.http.get('http://localhost:3001/note/'+ids+'/'+idm);
  }


  getnbAbsence(id,idmat){
    return this.http.get('http://localhost:3001/matiere/absNb/'+id+'/'+idmat);
  }
 


  
}
