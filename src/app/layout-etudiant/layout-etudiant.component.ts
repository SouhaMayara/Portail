import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';



import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout-etudiant',
  templateUrl: './layout-etudiant.component.html',
  styleUrls: ['./layout-etudiant.component.css']
})
export class LayoutEtudiantComponent implements OnInit {
  article: any;

  constructor(private apiService: ArticleService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.apiService.getOneArticle(id));
    this.apiService.getOneArticle(id).subscribe((res: any) => {
      console.log(res);
      this.article = res.data;});
  }

}
