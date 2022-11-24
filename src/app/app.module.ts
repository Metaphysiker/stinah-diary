import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntriesComponent } from './entries/entries.component';
import { EntriesOverviewComponent } from './entries-overview/entries-overview.component';

import { ImageComponent } from './image/image.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { ToDoComponent } from './to-do/to-do.component';
import { ToDoFormComponent } from './to-do-form/to-do-form.component';
import { ToDosComponent } from './to-dos/to-dos.component';
import { UserFormComponent } from './user-form/user-form.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { GoBackComponent } from './go-back/go-back.component';
import { FileFormComponent } from './file-form/file-form.component';
import { AwsImageComponent } from './aws-image/aws-image.component';


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
    SignupComponent,
    EntryFormComponent,
    EntriesComponent,
    ImageComponent,
    EntriesOverviewComponent,
    CalendarComponent,
    NotificationSettingComponent,
    ToDoComponent,
    ToDoFormComponent,
    ToDosComponent,
    UserFormComponent,
    NavButtonsComponent,
    GoBackComponent,
    FileFormComponent,
    AwsImageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    //FormsModule,
    MatSliderModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    RouterModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
