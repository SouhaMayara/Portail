import { Component, OnInit } from '@angular/core';
import {formatDate} from '@angular/common';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-liste-presence',
  templateUrl: './liste-presence.component.html',
  styleUrls: ['./liste-presence.component.css']
})
export class ListePresenceComponent implements OnInit {
  
  presentForm: FormGroup;
  today= new Date();
  jstoday = '';
  time = '';
  test = '';
  
  etudiantsPresent: Number[] = [];
  absent;
  seances;
  testSeance;
  user ;
  etudiants ;
  prof;
  SeanceCourante;
  
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { 
    this.presentForm = new FormGroup({
      matiere: new FormControl('', []),
      user: new FormControl('', []),
      seance: new FormControl('', [])
    })
  }
  
async ngOnInit(): Promise<any> {
  this.absent = "tesssssssssssssssssssssssssssssssssssssssst";
  this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-UTC');
    this.time = formatDate(this.today, ' hh:mm ', 'en-UTC');
    
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
    console.log("dayName************",tempsCourant);
  this.apiService.decodeToken();
  //let id = parseInt(this.activatedRoute.snapshot.paramMap.get('_id'));
  //console.log(parseInt(this.activatedRoute.parent.snapshot.paramMap.get('id')));
  //console.log(id);
  //console.log(parseInt(this.activatedRoute.parent.snapshot.params.id));
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

  this.apiService.getSeanceByProf(this.prof['_id'],dayName,'S4').subscribe(async (resultSeance: any) => {
    //console.log("00000000000000000000000000000000",resultSeance);
    this.seances = await resultSeance.data;
    console.log("seaaaaaaaaaaance",this.seances);
   /* console.log("proooooooooooooof",this.prof); */
    this.apiService.getGroupBySeance(this.seances[0]['_id'],this.prof['_id']).subscribe(async (resultGroup: any) => {
      //console.log(resultGroup);
      this.etudiants = await resultGroup.data[0]['groupe'].etudiants;
      
      console.log("eeeeeeeeeeeeeeee",this.seances);
    });
   });
   
     console.log('today: ',this.seances);
   /* console.log('jstoday: ',this.jstoday); */
  });
  });
  //this.seances=this.testSeance;
  // console.log("etudiantsPresent Matieeeeeeeeere",this.seances); 
  }
  
  async ajouter(id){
    const index: number = this.etudiantsPresent.indexOf(id);
    if (index !== -1) {
        this.etudiantsPresent.splice(index, 1);
    } else{
      
      this.etudiantsPresent.push(id);
    }
    console.log("etudiantsPresent",this.etudiantsPresent); 
    console.log("etudiantsPresent Matieeeeeeeeere",this.seances);  
  }


  async validate(){
    this.etudiantsPresent.forEach(etPresent => {
      this.apiService.addAbsence(this.seances['matiere'],this.seances['_id'],etPresent,this.presentForm).subscribe((res: any) => {
        console.log(res);
        
      })
      //console.log("Ciiiiiiiin",etPresent,this.seances[0]['matiere'],this.seances[0]['_id'],etPresent,this.presentForm);
    }); 
    console.log("etudiantsPresent",this.etudiantsPresent);  
  }

}
