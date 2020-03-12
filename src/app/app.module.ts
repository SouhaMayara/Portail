import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClient, HttpClientModule} from'@angular/common/http';

import { AppComponent } from './app.component';


import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';
import { LayoutProfComponent } from './layout-prof/layout-prof.component';
import { LayoutEtudiantComponent } from './layout-etudiant/layout-etudiant.component';
import { ListePresenceComponent } from './liste-presence/liste-presence.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    ProfComponent,
    LayoutProfComponent,
    LayoutEtudiantComponent,
    ListePresenceComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
    
  ],
  providers: [],
  bootstrap: [AppComponent,
              LoginComponent,
            LayoutProfComponent,
          ProfComponent,
          LayoutProfComponent,
          LayoutEtudiantComponent,
          ListePresenceComponent]
})
export class AppModule { }
