import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ProfComponent } from './prof/prof.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EtudiantComponent,
    ProfComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
