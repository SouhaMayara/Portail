import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-home-prof',
  templateUrl: './home-prof.component.html',
  styleUrls: ['./home-prof.component.css']
})


export class HomeProfComponent implements OnInit {

  user:any;
  id:any;

  public idd;
  articles: any;
  constructor(public profService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

     //this.id= jwt_decode(localStorage.getItem('token'));
     this.profService.decodeToken();
     //let id = parseInt(this.activatedRoute.snapshot.paramMap.get('_id'));
     //console.log(parseInt(this.activatedRoute.parent.snapshot.paramMap.get('id')));
     //console.log(id);
     //console.log(parseInt(this.activatedRoute.parent.snapshot.params.id));
     console.log(this.profService.getUser());
     this.profService.getUser().subscribe((res: any) => {
       console.log(res);
       this.user = res.data;});
  }

}
