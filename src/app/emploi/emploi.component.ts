import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
seances;
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.idG=this.user.groupe;
      console.log(this.idG);
      this.apiService.getSeance(this.idG).subscribe((res: any) => {
        console.log(res);
        this.seances = res.data;
        console.log(this.userG[0].groupe.nom);
      });
    });
    this.apiService.getUserInG().subscribe((res: any) => {
      console.log(res);
      this.userG = res.data;
      console.log(this.userG[0].groupe.nom);
    });
    

  }
  

}