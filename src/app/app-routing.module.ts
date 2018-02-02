import { BigLogoComponent } from './big-logo/big-logo.component';
import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/logo', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent },
  { path: 'logo', component: BigLogoComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
