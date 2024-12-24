import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { GuessComponent } from './guess/guess.component';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' }, // Προεπιλεγμένη ανακατεύθυνση
  { path: 'start', component: StartComponent }, // Route για το StartComponent
  { path: 'guess', component: GuessComponent }, // Route για το GuessComponent
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
