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
  role='';
  public user:any;
  article: any;
  constructor(private apiService: ArticleService,private auth:AuthService) {
    console.log("etudiantComponent*********************************");
    }

  ngOnInit() {
    
    this.auth.getUser().subscribe((res: any) => {
      this.user = res.data;
      console.log(this.user);
      console.log(this.user.role);});
     
    /*console.log(this.auth.userId);
    this.userId=this.auth.userId;
    console.log(this.userId);*/
    //console.log(this.apiService.getArticle(this.userId));
    /*this.apiService.getArticle(this.userId).subscribe((res: any) => {
      console.log(res);
      this.articles = res.data;});*/
      this.auth.getArticles().subscribe((res: any) => {
        console.log(res);
        this.articles = res.data });
  }

}
