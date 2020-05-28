import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {formatDate} from '@angular/common';
import { json } from 'body-parser';
@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {
user;
userG;
idG;
jour=["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
seances=[];
term;

today= new Date();
jstoday = '';
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.idG=this.user.groupe;
      //console.log(this.idG);
      if (this.user.role == 'Etudiant') {
        this.apiService.getSeance(this.idG).subscribe((res: any) => {
          console.log(res);
          this.seances = res.data;
          console.log(this.seances);
          //console.log(this.userG[0].groupe.nom);
          this.jstoday =formatDate(this.today, 'dd-MM-yyyy', 'en-UTC');
          for (let i = 0; i< this.seances.length; i++) {
              if(this.seances[i].rattrap=="catching up"){
                if(this.seances[i].DateS<this.jstoday){
                  this.apiService.deleteS(this.seances[i]._id).subscribe((res: any) => { 
                    console.log(res);
                    })
                }
              }
            

          }

        });
      } else {
        this.apiService.getProfId().subscribe((result : any) => {
          console.log(result);
          let prof = result.data;
          this.apiService.getSeancesByProf(prof._id).subscribe(async (rsSeance : any) => {
            this.seances= await rsSeance.data;
         await console.log(rsSeance.data);

         this.jstoday =formatDate(this.today, 'dd-mm-yyyy', 'en-UTC');
         for (let i = 0; i< this.seances.length; i++) {
             if(this.seances[i].rattrap=="catching up"){
               if(this.seances[i].DateS<this.jstoday){
                 this.apiService.deleteS(this.seances[i]._id).subscribe((res: any) => { 
                   console.log(res);
                   })
               }
             }
           

         }

          });
        });
      }
    });
   /* this.apiService.getUserInG().subscribe((res: any) => {
      console.log(res);
      this.userG = res.data;
      console.log(this.userG[0].groupe.nom);
    });*/
  }
  

}