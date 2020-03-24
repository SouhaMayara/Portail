import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { json } from 'body-parser';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})
export class AbsenceComponent implements OnInit {
  user;
  userG;
  idG;
  matieres=[];
  noms=[];
  nb=[];
  pourcentage=[];
  ntotal=[];

  constructor(private apiService: AuthService) { }

  ngOnInit(): void {

    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.idG=this.user.groupe;
      console.log(this.idG);
      this.apiService.getMatiere(this.idG).subscribe((res: any) => {
        console.log(res);
        this.matieres = res.data;
        console.log(this.userG[0].groupe.nom);
        for (let index = 0; index < this.matieres.length; index++) {
          const nom = this.matieres[index].nom;
          this.noms[index]=nom;
          this.ntotal[index]=this.matieres[index].nbreHeures;

          console.log(this.user._id);
          console.log(this.noms[index]);
          this.apiService.getnbAbsence(this.user._id,this.noms[index]).subscribe((res: any) => {
            console.log(res);
            this.nb[index] = res.data;
            this.pourcentage[index]=(parseInt(this.nb[index])/(parseInt(this.ntotal[index])))*100;
            console.log(this.pourcentage[index]);
            
          });
      
          
        }
        console.log(this.noms);
        console.log(this.nb);
        //console.log(this.matiere.nom);
    
      });
    });

    



    this.apiService.getUserInG().subscribe((res: any) => {
      console.log(res);
      this.userG = res.data;
      console.log(this.userG[0].groupe.nom);
    });
    



  }

}