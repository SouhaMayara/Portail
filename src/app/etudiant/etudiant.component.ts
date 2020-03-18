import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import  { AuthService } from '../auth.service';


@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  articles = [];
  userId:any;
  public role:any;
  public user:any;
  constructor(private apiService: ArticleService,private auth:AuthService) {
    console.log("etudiantComponent*********************************");
    }

  ngOnInit() {
    
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
      console.log(this.user);
      console.log(this.user.role);
      this.role=this.user.role;
      console.log(this.role);
      this.auth.getArticle1(this.role).subscribe((res: any) => {
        console.log(res);
        this.articles = res.data;});
    });
     
    /*console.log(this.auth.userId);
    this.userId=this.auth.userId;
    console.log(this.userId);*/
    //console.log(this.apiService.getArticle(this.userId));
    /*this.apiService.getArticle(this.userId).subscribe((res: any) => {
      console.log(res);
      this.articles = res.data;});*/
      
  }

}
