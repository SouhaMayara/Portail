import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-les-articles',
  templateUrl: './les-articles.component.html',
  styleUrls: ['./les-articles.component.css'],
  providers: [DatePipe]
})
export class LesArticlesComponent implements OnInit {
  articles;
  user: any;
  title:any;
  term;
  p;
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute,private datePipe: DatePipe) { }

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
      this.articles = res.data
    for(let index=0; index<this.articles.length;index++){
      
      this.articles[index].date=this.datePipe.transform( this.articles[index].date , 'yyyy-MM-dd');
      //console.log(k) 
    }
    });
  }


}
