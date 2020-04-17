import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-note-e',
  templateUrl: './note-e.component.html',
  styleUrls: ['./note-e.component.css']
})
export class NoteEComponent implements OnInit {
  userG;
  user;
  idG;
  matieres=[];
  noms=[];
  nb=[];
  pourcentage=[];
  mat;
  listeId=[];
  constructor(private apiService: AuthService) {}
  ngOnInit(): void {
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.idG=this.user.groupe;
      console.log(this.idG);
      this.apiService.getMatiere(this.idG).subscribe((res: any) => {
        this.matieres = res.data;
        for (let index = 0; index < this.matieres.length; index++) {
          const idMatiere=this.matieres[index];
          this.listeId[index]=this.matieres[index];
          console.log(this.listeId);

          this.apiService.getMatiereById(idMatiere).subscribe((res: any) => {
            this.mat = res.data;
            this.noms[index]=[this.mat.nom,this.matieres[index]];
           
          console.log(this.noms);
          console.log(this.user._id);
          console.log(this.listeId[index]);
          this.apiService.getNote(this.user._id,this.listeId[index]).subscribe((res: any) => {
            console.log(res);
            this.nb = res.data;
            console.log(this.nb);  
          });
          });
        }
        console.log(this.noms);
        console.log(this.nb);

    
      });
    });



   /* this.apiService.getUserInG().subscribe((res: any) => {
      console.log(res);
      this.userG = res.data;
      console.log(this.userG[0].groupe.nom);
    });*/
  }

}
