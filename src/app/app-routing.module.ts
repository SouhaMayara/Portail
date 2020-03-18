import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfComponent } from './prof/prof.component'
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';
import { ArticleComponent } from './article/article.component';
import { LesArticlesComponent } from './les-articles/les-articles.component';


const routes: Routes = [
  {path : '', component : LoginComponent},
  { path : 'home' , component : HomeComponent//, canActivate: [AuthGuard]//},
  , children : [
      { path : '' ,  component : LesArticlesComponent },
      {path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuard]},]}

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
