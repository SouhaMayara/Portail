import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-mark-note',
  templateUrl: './mark-note.component.html',
  styleUrls: ['./mark-note.component.css']
})
export class MarkNoteComponent implements OnInit {

  user : any;
  prof: any;

  matieresList: any [] = new Array();
  groupesList: any [] = new Array();

  etudiantsList: any ;
  matieres: any;
  groupes: any;
  typesMatiere: any;
  typeNote: any = "of ";

  constructor(private apiService: AuthService) { }
  
  async ngOnInit(): Promise<any> {

    this.apiService.decodeToken();

    this.apiService.getUser().subscribe(async (resUser: any) => {
      this.user = await resUser.data;
      this.apiService.getProfId().subscribe(async (resProf : any) => {
        this.prof = await resProf.data;
        this.apiService.getMatiereByProf(this.prof._id).subscribe(async (resMats : any) => {
          this.matieres = resMats.data;
          console.log(this.matieres);
          this.matieres.forEach(async mat => {
            console.log(mat);
            this.apiService.getMatiereById(mat).subscribe(async (resMat : any) => {
              //console.log(resMat.data);
              await this.matieresList.push(resMat.data);
              await console.log("ffffffffffffffffffffffff",this.matieresList);
            });
            //console.log(this.matieresList);
            
          });
        });
      });
    });
    
    //await console.log(this.matieresList);
  }

  async getGroupe(idMAt): Promise<any>{
    this.groupesList = await [];
    console.log("sdfgnh",idMAt)
    if (idMAt != null){
      this.apiService.getGroupesByMat(idMAt).subscribe( async (resGrps : any) => {
        this.groupes = await resGrps.data;
        this.groupes.forEach(async grp => {
          await console.log(grp);
          this.apiService.getGroupeById(grp).subscribe(async (resGrp : any) => {
            //console.log(resGrp.data);
            await this.groupesList.push(resGrp.data);
            await console.log(this.groupesList);
          });
          //console.log(this.matieresList);
          
        });
      });
    }
  }
  getTypeMat(idMat, idGrp){
    console.log("matiere:",idMat,"Groupe",idGrp);
    if ((idMat != "") && (idGrp != "")){
      console.log('good job mira <3 ');
      this.apiService.getTypeMat(idMat,idGrp,this.prof._id).subscribe((resType : any) => {
        this.typesMatiere = resType.data;
        console.log(this.typesMatiere);
      });

    }
  }
  consoler(type){
    console.log('type',type);
  }

  async recherche(idMat, idGrp,type){
    this.typeNote = await "of ";
    switch (type) {
      case "Course":
        this.typeNote = await this.typeNote+"Exam";
        break;
      case "TD":
        this.typeNote = await this.typeNote+"DS";
        break;
    
      default:
        this.typeNote = await this.typeNote+type;
        break;
    }
    console.log("matiere:",idMat,"Groupe",idGrp);
    if ((idMat != "") && (idGrp != "") && (type != "")){
      console.log('good job mira <3 ');
      this.apiService.getUsersInG(idGrp).subscribe(async (resEtudiants : any) => {
        //resEtudiants.data
        this.etudiantsList= await resEtudiants.data;
        //this.etudiantsList._proto_.sort(firstname);
        this.etudiantsList.sort((a, b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0) );
        await console.log(resEtudiants.data);
        /* this.etudiantsList.etudiants.forEach(async idUser => {
          await console.log(idUser);
          this.apiService.getUser()
        }); */
      })

    }
  }

}
