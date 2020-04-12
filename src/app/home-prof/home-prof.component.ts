import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
@Component({
  selector: 'app-home-prof',
  templateUrl: './home-prof.component.html',
  styleUrls: ['./home-prof.component.css']
})
export class HomeProfComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

}
