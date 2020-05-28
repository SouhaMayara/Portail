import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { async } from '@angular/core/testing';
import { noteEtudiant } from './noteEtudiant';
@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent implements OnInit {

  user : any;
  prof: any;
  nt:any;
  noteEtudiants : noteEtudiant[] = new Array();
  noteEt : noteEtudiant;
  matieresList: any [] = new Array();
  groupesList: any [] = new Array();
  etudiantsList: any ;
  dateAb : any;
  matieres: any;
  groupes: any;
  typesMatiere: any;
  typeNote: any;
  idMatiere: any;
  idGroupe: any;
  test: string;

  constructor(private apiService: AuthService) { }

  async ngOnInit(): Promise<any> {

    this.matieresList = [];
    this.groupesList = [];
    this.etudiantsList = [];
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
    if (idMAt != null){
      this.apiService.getGroupesByMat(idMAt).subscribe( async (resGrps : any) => {
        this.groupes = await resGrps.data;
        this.groupes.forEach(async grp => {
          //await console.log(grp);
          this.apiService.getGroupeById(grp).subscribe(async (resGrp : any) => {
            //console.log(resGrp.data);
            await this.groupesList.push(resGrp.data);
            //await console.log(this.groupesList);
          });
          
        });
      });
    }
  }
  async getTypeMat(idMat, idGrp): Promise<any>{
    this.typesMatiere = await [];
    //console.log("matiere:",idMat,"Groupe",idGrp);
    if ((idMat != "") && (idGrp != "")){
      this.apiService.getTypeMat(idMat,idGrp,this.prof._id).subscribe((resType : any) => {
        this.typesMatiere = resType.data;
        //console.log(this.typesMatiere);
      });

    }
  }

  async recherche(idMat, idGrp,type): Promise<any>{
    this.idMatiere = await idMat;
    this.idGroupe = await idGrp;
    switch (type) {
      case "Course":
        this.typeNote = "Examen";
        break;
      case "TD":
        this.typeNote = "DS";
        break;
    
      default:
        this.typeNote = type;
        break;
    }

    if ((idMat != "") && (idGrp != "") && (type != "")){
      //console.log('good job mira <3 ');
      this.apiService.getUsersInG(idGrp).subscribe(async (resEtudiants : any) => {
        
        this.etudiantsList= await resEtudiants.data;
        console.log(this.etudiantsList);
        this.etudiantsList.forEach(async etud =>{ 
        this.apiService.getOneNote(etud._id,idMat,this.typeNote).subscribe(async(resNote :any)=>{
          if (resNote.data) {
         console.log(etud._id,idMat,type);
          console.log(resNote);
          this.noteEt= { idEt: etud._id,
          cin: etud.cin,
          lastname:etud.lastname,
          firstname: etud.firstname,
          email: etud.email,
          idNote: resNote.data._id,
          note: resNote.data.note};
          this.noteEtudiants.push(this.noteEt);
        }})})
        this.noteEtudiants.sort((a, b) => (a.lastname > b.lastname) ? 1 : ((b.lastname > a.lastname) ? -1 : 0) );
        //await console.log(resEtudiants.data);
      });

    }
  }
  async supprimerNote(idNote) {
 
    this.apiService.deleteNote(idNote).subscribe(
      data => {
        let index: any = this.noteEtudiants.findIndex((element) => element.idNote == idNote);
        this.noteEtudiants.splice(index, 1);
        
      
        this.ngOnInit();
        
      }
    
    )
    };

    async updateNote(idNote,noteUpdate){

      console.log(idNote)
      console.log(noteUpdate)
      const upNote = { "note" : noteUpdate}
        this.apiService.updateNote(idNote,upNote).subscribe(
        data=>{
          this.ngOnInit();
        }
      )
        
            
    
          }
    

  
  
  }

