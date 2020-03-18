import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;

  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.apiService.getUser());
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;});
  }

  }


