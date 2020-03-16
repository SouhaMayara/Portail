import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
//import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { json } from 'body-parser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:any;
  id:any;

  public idd;
  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    //this.id= jwt_decode(localStorage.getItem('token'));
    this.apiService.decodeToken();
    console.log("*********************************");
    //let id = parseInt(this.activatedRoute.snapshot.paramMap.get('_id'));
    //console.log(parseInt(this.activatedRoute.parent.snapshot.paramMap.get('id')));
    //console.log(id);
    console.log("*********************************");
    //console.log(parseInt(this.activatedRoute.parent.snapshot.params.id));
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;});
  }

}
