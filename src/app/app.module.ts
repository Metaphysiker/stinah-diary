import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AnimalsOverviewComponent } from './animals-overview/animals-overview.component';
import { DebuggerComponent } from './debugger/debugger.component';
import { AnimalComponent } from './animal/animal.component';
import { AnimalFormComponent } from './animal-form/animal-form.component';
import { EntryComponent } from './entry/entry.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    NavbarComponent,
    AnimalsOverviewComponent,
    DebuggerComponent,
    AnimalComponent,
    AnimalFormComponent,
    EntryComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
