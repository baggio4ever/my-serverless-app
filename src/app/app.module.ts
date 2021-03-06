import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import { MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppRoutingModule } from './/app-routing.module';

import { CardsComponent } from './cards/cards.component';
import { BigLogoComponent } from './big-logo/big-logo.component';
import { HistoryComponent } from './history/history.component';
import { FileSendComponent } from './file-send/file-send.component';
import { SimpleSendComponent } from './simple-send/simple-send.component';
import { XmlViewComponent } from './xml-view/xml-view.component';
import { MyHighlightDirective } from './my-highlight.directive';
import { ScrollViewComponent } from './scroll-view/scroll-view.component';


@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    BigLogoComponent,
    HistoryComponent,
    FileSendComponent,
    SimpleSendComponent,
    XmlViewComponent,
    MyHighlightDirective,
    ScrollViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,  // HTTP通信モジュールをインポート
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    AppRoutingModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
//    MatNativeDateModule
    MatMomentDateModule,
//    MomentDateAdapter,
    MatTableModule,
    MatToolbarModule,
//    HighlightJsModule
    MatExpansionModule
  ],
  providers: [ AppService ],  // 作成したサービスを登録
  bootstrap: [AppComponent]
})
export class AppModule { }
