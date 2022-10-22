import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AnimalsOverviewComponent } from './animals-overview/animals-overview.component';
import { AnimalComponent } from './animal/animal.component';
import { DebuggerComponent } from './debugger/debugger.component';
import { SignupComponent } from './signup/signup.component';
import { EntriesComponent } from './entries/entries.component';
import { EntriesOverviewComponent } from './entries-overview/entries-overview.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'animal', component: AnimalComponent },
  { path: 'animal/:id', component: AnimalComponent },
  { path: 'debugger', component: DebuggerComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'animals-overview', component: AnimalsOverviewComponent },
  { path: 'entries', component: EntriesComponent },
  { path: 'entries-overview', component: EntriesOverviewComponent },
  { path: 'calendar', component: CalendarComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
