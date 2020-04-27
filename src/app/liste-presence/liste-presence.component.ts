import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-liste-presence',
  templateUrl: './liste-presence.component.html',
  styleUrls: ['./liste-presence.component.css']
})
export class ListePresenceComponent implements OnInit {
  
  today= new Date();
  jstoday = '';
  test = '';
  
  etudiantsPresent: Number[] = [];
  seances;
  testSeance;
  user ;
  etudiants ;
  nomGroupe : any;
  prof;
  SeanceCourante;
  anneScolaire: any;
  
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { 
  }
  
async ngOnInit(): Promise<any> {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var dayName = days[d.getDay()];
    
    var h = d.getHours() ; 
    var m = d.getMinutes();
    var min ='';
    if(h == 0) {h = 24;}
    if (m < 10) { min ='0'+m;}
    else min=''+m;
    var tempsCourant = h+':'+min
  
  this.apiService.decodeToken();
  console.log(this.apiService.getUser());
  this.apiService.getUser().subscribe(async (res: any) => {
    console.log(res);
    this.user = await res.data;
    this.apiService.getProfId().subscribe(async (resProf: any) =>{
      this.prof = await resProf.data;
      this.apiService.decodeToken();

      if(tempsCourant >='8:30'  && tempsCourant <= '10:00' ){
          this.SeanceCourante ='S1';}
      else if (tempsCourant >= '10:10' && tempsCourant <= '11:40' ){
          this.SeanceCourante ='S2';}
      else if (tempsCourant >= '11:50' && tempsCourant <= '13:20' ){
          this.SeanceCourante ='S3';}
      else if (tempsCourant >= '13:50' && tempsCourant <= '15:20' ){
          this.SeanceCourante ='S4';}
      else if (tempsCourant >= '15:30' && tempsCourant <= '17:00' ){
          this.SeanceCourante ='S5';}    
      else if (tempsCourant >= '17:10' && tempsCourant <= '18:40' ){
          this.SeanceCourante ='S6';}
      this.apiService.getSeanceByProf(this.prof['_id'],dayName,this.SeanceCourante).subscribe(async (resultSeance: any) => {
        this.seances = await resultSeance.data;
        console.log("seance",this.seances);
        this.apiService.getGroupBySeance(this.seances[0]['_id'],this.prof['_id']).subscribe(async (resultGroup: any) => {
          console.log("grouuupe",resultGroup);

          this.etudiants = await resultGroup.data[0]['groupe'].etudiants;
          this.etudiants.sort((a, b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0) );
          this.anneScolaire = await resultGroup.data[0]['groupe']['annee_scolaire'];
          this.nomGroupe = await resultGroup.data[0]['groupe']['filiere']+'-0'+resultGroup.data[0]['groupe']['niveau']+'-'+resultGroup.data[0]['groupe']['nom'];
        });
      });
      
      });
  });
  }
  
  async ajouter(id): Promise<any>{
    const index: any = this.etudiantsPresent.indexOf(id);
    if (index !== -1) {
        this.etudiantsPresent.splice(index, 1);
    } else{
      
      this.etudiantsPresent.push(id);
    }
    console.log("etudiantsPresent",this.etudiantsPresent); 
  }


  async validate(): Promise<any>{


    this.etudiantsPresent.forEach(async etPresent => {
      this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-UTC');
      this.apiService.getAbsence(this.seances[0]['matiere']['_id'],this.seances[0]['_id'],etPresent).subscribe((res: any) => {
        if (res.data === null) {
          
         
          this.apiService.addAbsence(this.seances[0]['matiere']['_id'],this.seances[0]['_id'],etPresent,this.jstoday).subscribe((res: any) => {

            console.log(res);
            
          }) 
        }else{
          if (res.data['DateAbs'] != this.jstoday){
          this.apiService.addAbsence(this.seances[0]['matiere']['_id'],this.seances[0]['_id'],etPresent,this.jstoday).subscribe((res: any) => {

            console.log(res);
            
          }) 
          } else {
            console.log("absent marked !");
          }
        }
      }) 
    });  
  
  }

}
