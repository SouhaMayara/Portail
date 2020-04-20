import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-list-ab-prof',
  templateUrl: './list-ab-prof.component.html',
  styleUrls: ['./list-ab-prof.component.css']
})
export class ListAbProfComponent implements OnInit {
  idPro;
  constructor(private apiService: AuthService) { }
  matieres : any[];
  ngOnInit(): void {
    this.apiService.getMatiereByIdProf(this.idPro).subscribe((res: any) => {
      this.matieres = res.data;
  });

};
}
