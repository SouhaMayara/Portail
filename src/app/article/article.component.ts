import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
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
