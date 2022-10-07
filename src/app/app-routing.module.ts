import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AnimalsOverviewComponent } from './animals-overview/animals-overview.component';
import { AnimalComponent } from './animal/animal.component';
import { DebuggerComponent } from './debugger/debugger.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'animal', component: AnimalComponent },
  { path: 'animal/:id', component: AnimalComponent },
  { path: 'debugger', component: DebuggerComponent},
  { path: 'animals-overview', component: AnimalsOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
