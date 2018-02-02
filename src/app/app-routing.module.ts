import { BigLogoComponent } from './big-logo/big-logo.component';
import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/logo', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent },
  { path: 'logo', component: BigLogoComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
