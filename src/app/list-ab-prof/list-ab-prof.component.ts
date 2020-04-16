import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-ab-prof',
  templateUrl: './list-ab-prof.component.html',
  styleUrls: ['./list-ab-prof.component.css']
})
export class ListAbProfComponent implements OnInit {

  constructor() { }
  matieres : any[];
  ngOnInit(): void {
    this.matieres=['test1','test2','test3','test4']
  }

}
