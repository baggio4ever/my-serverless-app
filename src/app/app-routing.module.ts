import { XmlViewComponent } from './xml-view/xml-view.component';
import { SimpleSendComponent } from './simple-send/simple-send.component';
import { BigLogoComponent } from './big-logo/big-logo.component';
import { CardsComponent } from './cards/cards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history/history.component';
import { FileSendComponent } from './file-send/file-send.component';

const routes: Routes = [
/*  S3のWeb公開機能を使う場合は、コレダメ？
  { path: '', redirectTo: '/logo', pathMatch: 'full' }, 
*/  { path: 'cards', component: CardsComponent },
  { path: 'logo', component: BigLogoComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'file-send', component: FileSendComponent },
  { path: 'simple-send', component: SimpleSendComponent },
  { path: 'xml', component: XmlViewComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule { }
