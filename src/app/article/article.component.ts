import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../article.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [DatePipe]
})
export class ArticleComponent implements OnInit {
  article: any;

  constructor(private apiService: ArticleService, private activatedRoute: ActivatedRoute,private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.apiService.getOneArticle(id));
    this.apiService.getOneArticle(id).subscribe((res: any) => {
      console.log(res);
      this.article = res.data;
      this.article.date=this.datePipe.transform( this.article.date , 'yyyy-MM-dd hh:mm');});
  }

}
