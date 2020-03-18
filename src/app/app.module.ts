import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule,    ReactiveFormsModule}   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from'@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';
import { AuthService } from './auth.service';
import { ListePresenceComponent } from './liste-presence/liste-presence.component';
import { AuthGuard } from './auth.guard';

import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    ProfComponent,
    HomeComponent,
    ListePresenceComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent,
              LoginComponent,
              ProfComponent,
              ListePresenceComponent],
  exports: []
})
export class AppModule { };