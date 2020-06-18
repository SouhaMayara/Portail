import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
 
// CommonJS
import { async } from '@angular/core/testing';
import { AbsenceComponent } from '../absence/absence.component';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-list-ab-prof',
  templateUrl: './list-ab-prof.component.html',
  styleUrls: ['./list-ab-prof.component.css']
})
export class ListAbProfComponent implements OnInit {

  Swal = require('sweetalert2')
  user : any;
  prof: any;
  groupes: any;
  etu:any;
  selectedMoment : any;
  ABsenceList: any [] = new Array();
  listUser: any [] = new Array();
  matieresList: any [] = new Array();
  groupesList: any [] = new Array();
  idMat: any;
  idGrp: any;
  dts: any;
  dateseance: any;
  constructor(private apiService: AuthService) { }
  matieres : any;
  etudiantsList: any ;
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
              
              await this.matieresList.push(resMat.data);
              await console.log(this.matieresList);
            });
            
            
          });
        });
      });
    });

    

};
async getGroupe(idMAt): Promise<any>{
  this.groupesList = await [];
  console.log(idMAt)
  if (idMAt != null){
    this.apiService.getGroupesByMat(idMAt).subscribe( async (resGrps : any) => {
      this.groupes = await resGrps.data;
      this.groupes.forEach(async grp => {
        await console.log(grp);
        this.apiService.getGroupeById(grp).subscribe(async (resGrp : any) => {
          
          await this.groupesList.push(resGrp.data);
          await console.log(this.groupesList);
        });
       
        
      });
    });
  }
}

async recherche(idMat, idGrp, dts): Promise<any> {
  this.listUser = [];
  this.idMat = await idMat;
  this.idGrp = await idGrp;
  this.dateseance = dts;
  dts = formatDate(dts, 'dd-MM-yyyy', 'en-UTC');
  console.log("matiere:",idMat,"Groupe",idGrp,"date",dts);
  if ((idMat != "") && (idGrp != "")&&(dts != "")){
   
    this.apiService.getAbsenceMatDate(idMat,dts).subscribe(async (resAbsence : any) => {
      
      this.ABsenceList= await resAbsence.data;
      console.log(this.ABsenceList);
      this.ABsenceList.forEach(async abs => {
        this.apiService.getu(abs.user).subscribe(async (res : any) => {
          
          console.log(res.data);
          if (res.data.groupe === idGrp){
            
          
          await this.listUser.push(res.data);

          }else{
            console.log("pas d'absences");
          }
      })
      
    });

  });
}
}


async supprimerAb(_id) {
 


  this.apiService.getAbByuser(_id).subscribe(async (resus : any) =>{
    this.etu=await resus.data;
    console.log(this.etu)
    console.log(this.etu._id);
    this.Swal.fire(
      {
        title : "Are you sure ?",
        text : "you will not be able to recover this student ",
        type : "warning" , 
        showCancelButton : true,
        confirmButtonText : 'Yes',
        cancelButtonText : 'No , keep it'
      }
    ).then( 
      (result)=>{
        if(result.value){
          this.apiService.deleteAB(this.etu._id).subscribe(
            data => {
              console.log(data);
              this.recherche(this.idMat,this.idGrp,this.dateseance);
            });
          this.Swal.fire('deleted' , '' , 'success')
        }else if(result.dismiss === this.Swal.DismissReason.cancel){
            this.Swal.fire('Cancel' , '' , 'error');
        }
    }
  )
  });
}
}
