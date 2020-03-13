import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutProfComponent } from './layout-prof/layout-prof.component';
import { ProfComponent } from './prof/prof.component';
import { LayoutEtudiantComponent } from './layout-etudiant/layout-etudiant.component';
import { EtudiantComponent } from './etudiant/etudiant.component';


const routes: Routes = [
  {path : '', component : LoginComponent,},
  { path : 'prof' , component : LayoutProfComponent ,  children : [
      { path : '' , component : ProfComponent }] },
  { path : 'etudiant' ,  component : LayoutEtudiantComponent, children : [
      { path : '' ,  component : EtudiantComponent } ] }];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { };