import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component';
import { LayoutEtudiantComponent } from './layout-etudiant/layout-etudiant.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';
import { HomeProfComponent } from './home-prof/home-prof.component';


const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'homeprof', component : HomeProfComponent
  , children : [
    { path : '' ,  component : ProfComponent },
    {path: 'article/:id', component: LayoutEtudiantComponent, canActivate: [AuthGuard]},
    {path: 'listepresence', component: ListePresenceComponent, canActivate: [AuthGuard]},
    {path: 'addpresence', component: ListePresenceComponent, canActivate: [AuthGuard]},
    {path: 'profilprof', component: ProfComponent, canActivate: [AuthGuard]},
    {path: 'notes', component: ListePresenceComponent, canActivate: [AuthGuard]},
    {path: 'document', component: ListePresenceComponent, canActivate: [AuthGuard]},
    {path: 'emplois', component: ListePresenceComponent, canActivate: [AuthGuard]},
    {path: 'mail', component: ListePresenceComponent, canActivate: [AuthGuard]},
  ]},

  { path : 'home' , component : HomeComponent//, canActivate: [AuthGuard]//},
  , children : [
      { path : '' ,  component : EtudiantComponent },
      {path: 'article/:id', component: LayoutEtudiantComponent, canActivate: [AuthGuard]},]}

   /*, children : [
      { path : '' , component : ProfComponent },
      { path : 'presence' , component : ListePresenceComponent },
    ] },*/
 // { path : 'etudiant' ,  component : LayoutEtudiantComponent, children : [
   //   { path : '' ,  component : EtudiantComponent } ] , canActivate: [AuthGuard]}
    ];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [ RouterModule ]

})
// tslint:disable-next-line:semicolon
export class AppRoutingModule {};
export const routingComponents =[HomeComponent];
