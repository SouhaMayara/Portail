import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-les-articles',
  templateUrl: './les-articles.component.html',
  styleUrls: ['./les-articles.component.css']
})
export class LesArticlesComponent implements OnInit {
  articles: any;
  user: any;

  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.apiService.decodeToken();
    //let id = parseInt(this.activatedRoute.snapshot.paramMap.get('_id'));
    //console.log(parseInt(this.activatedRoute.parent.snapshot.paramMap.get('id')));
    //console.log(id);
    //console.log(parseInt(this.activatedRoute.parent.snapshot.params.id));
    console.log(this.apiService.getUser());
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;});
    this.apiService.decodeToken();
    this.apiService.getArticles().subscribe((res: any) => {
      console.log(res);
      this.articles = res.data });
  }

}
