import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutProfComponent } from './layout-prof/layout-prof.component';
import { ProfComponent } from './prof/prof.component';
import { LayoutEtudiantComponent } from './layout-etudiant/layout-etudiant.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path : '', component : LoginComponent},
  { path : 'prof' , component : LayoutProfComponent ,canActivate: [AuthGuard],  children : [
      { path : '' , component : ProfComponent },
      { path : 'presence' , component : ListePresenceComponent },
    ] },
  { path : 'etudiant' ,  component : LayoutEtudiantComponent, children : [
      { path : '' ,  component : EtudiantComponent } ] , canActivate: [AuthGuard]}
    ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { };