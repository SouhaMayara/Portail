import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-rattrapage',
  templateUrl: './add-rattrapage.component.html',
  styleUrls: ['./add-rattrapage.component.css']
})
export class AddRAttrapageComponent implements OnInit {

  groupesList: any [] = new Array();
  user: any;
  matieresList: any[]= new Array();
  idMatiere: any;
  idGroupe: any;
  prof: any;
  matieres: any;
  groupes: any;
  typesMatiere: any[]= new Array();
  currentDate: any;
  public testDate : boolean;
  nomSeance : any;
  nomSeances : any;
  matiere: any = null;
  groupe: any = null;
  nom_matiere: any;
  nomProf: any;
  dayName: any = null;
  profDetail: any;
  typeS: any = null;
  timeS: any = null;


  constructor(private apiService: AuthService) { }

  async ngOnInit(): Promise<any> {
    this.currentDate = formatDate(Date(), 'yyyy-MM-dd', 'en-UTC');
    console.log(this.currentDate);
    this.nomSeance = ['S1','S2','S3','S4','S5','S6'];
    this.nomSeances = null;
    this.typesMatiere = null;
    this.timeS = null;
    this.typeS = null;
    this.dayName = null ;
    this.testDate = false;
    this.matieresList = [];
    this.groupesList = [];
    this.idMatiere = null;
    this.idGroupe = null;
    this.apiService.decodeToken();

    this.apiService.getUser().subscribe(async (resUser: any) => {
      this.user = await resUser.data;
      this.apiService.getProfId().subscribe(async (resProf : any) => {
        this.prof = await resProf.data;
        this.apiService.getMatiereByProf(this.prof._id).subscribe(async (resMats : any) => {
          this.matieres = resMats.data;
          //console.log(this.matieres);
          this.matieres.forEach(async mat => {
            this.apiService.getMatiereById(mat).subscribe(async (resMat : any) => {
              await this.matieresList.push(resMat.data);
              //await console.log(this.matieresList);
            });
            
          });
        });
      });
    });
    
  }


  async getGroupe(idMAt): Promise<any>{
    this.groupesList = await [];
    this.matiere = idMAt;
    this.apiService.getMatiereById(idMAt).subscribe(async (resMat : any) => {
      this.nom_matiere = resMat.data.nom;
    })
    if (idMAt != null){
      this.apiService.getGroupesByMat(idMAt).subscribe( async (resGrps : any) => {
        this.groupes = await resGrps.data;
        this.groupes.forEach(async grp => {
          this.apiService.getGroupeById(grp).subscribe(async (resGrp : any) => {
            //console.log(resGrp.data);
            await this.groupesList.push(resGrp.data);
          });
          
        });
      });
    }
  }

  async getTypeMat(idMat, idGrp): Promise<any>{
    this.groupe = idGrp;
    this.typesMatiere = await [];
    if ((idMat != "") && (idGrp != "")){
      this.apiService.getTypeMat(idMat,idGrp,this.prof._id).subscribe((resType : any) => {
        this.typesMatiere = resType.data;
        //console.log(this.typesMatiere);
      });

    }
  }

  async testDateFN(t): Promise<any>{
    this.testDate = false;
    this.nomSeances = null ;
    this.nomSeance = ['S1','S2','S3','S4','S5','S6'];
    let index;
    if (this.currentDate <= t) {
      this.testDate = false;
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
     var d = new Date(t);
      this.dayName = days[d.getDay()];
      this.apiService.getSeancesByDay(this.dayName,this.matiere,this.groupe).subscribe(async (res : any) => {
        console.log(res)
        res.data.forEach(async seance => {
          index = this.nomSeance.indexOf(seance.nom);
          console.log(seance);
          if (index !== -1) {
            this.nomSeance.splice(index, 1);
          }
        });
        this.nomSeances = this.nomSeance;
        console.log("nonmSeance :", this.nomSeance);
      });
      
    } else {
      this.testDate = true;

    }
  }
  async saveInfoType(val) : Promise <any>{
    this.typeS = val;
  }
  async saveInfoTime(val) : Promise <any>{
    this.timeS = val;
  }
  async validate(day): Promise <any>{ 
    if (this.timeS == null || this.typeS == null || this.dayName == null || this.groupe == null || this.matiere == null) {
      alert('You must enter all the information!');
    } else {
      const seance = {
        nom_matiere: this.nom_matiere,
        nomProf: this.user.firstname + ' ' + this.user.lastname,
        jour: this.dayName,
        DateS:day,
        rattrap : 'catching up',
        nom: this.timeS,
        type: this.typeS,
        groupe: null,
        matiere: null ,
      }
      seance.DateS=formatDate(seance.DateS, 'dd-MM-yyyy', 'en-UTC');
      this.apiService.addSeance(this.groupe,this.matiere,this.prof._id,seance).subscribe(async (res : any) => {
        seance.DateS=formatDate(seance.DateS, 'dd-MM-yyyy', 'en-UTC');
        console.log(res);
        
      });
      await this.ngOnInit();
      alert('Catch-up added successfully!');
    }
    
  }

}
