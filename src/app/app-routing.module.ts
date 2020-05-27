import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component'
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';
import { HomeProfComponent } from './home-prof/home-prof.component';
import { ArticleComponent } from './article/article.component';
import { LesArticlesComponent } from './les-articles/les-articles.component';
import { ProfilComponent } from './profil/profil.component';
import { EmploiComponent } from './emploi/emploi.component';
import { MapComponent } from './map/map.component';
import { AbsenceComponent } from './absence/absence.component';
import { NoteEComponent } from './note-e/note-e.component';
import { ListAbProfComponent } from './list-ab-prof/list-ab-prof.component';
import { MarkNoteComponent } from './mark-note/mark-note.component';
import { NotificationsComponent } from './notifications/notifications.component';



const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'homeprof/:id', component : HomeProfComponent, 
  canActivate: [AuthGuard]
  , children : [
    { path : '' ,  component : LesArticlesComponent },
    //{path: 'article/:id', component: LayoutEtudiantComponent, canActivate: [AuthGuard]},
    {path: 'article/:id', component: ArticleComponent},
    {path: 'listAbProf/:id', component: ListAbProfComponent},
    {path: 'listepresence/:id', component: ListePresenceComponent},
    {path: 'profile/:id', component: ProfilComponent},
    {path: 'notes', component: MarkNoteComponent},
    {path: 'document', component: ListePresenceComponent},
    {path: 'emploi/:id', component: EmploiComponent},
    {path: 'mail', component: ListePresenceComponent},
  ]},

  { path : 'home/:id' , component : HomeComponent, canActivate: [AuthGuard]
  , children : [
      { path : '' ,  component : LesArticlesComponent },
      {path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuard]},
      {path: 'profile/:id', component: ProfilComponent, canActivate: [AuthGuard]},
      {path: 'emploi/:id', component: EmploiComponent, canActivate: [AuthGuard]},
      {path: 'map', component: MapComponent, canActivate: [AuthGuard]},
      {path: 'absence/:id', component: AbsenceComponent, canActivate: [AuthGuard]},
      {path: 'note_e/:id', component: NoteEComponent, canActivate: [AuthGuard]},
      {path: 'notification/:id', component: NotificationsComponent, canActivate: [AuthGuard]}
]}
,
  { path : "**" , 
    redirectTo : '/'    }
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