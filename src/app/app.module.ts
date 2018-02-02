import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

import { MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './/app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { BigLogoComponent } from './big-logo/big-logo.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    BigLogoComponent,
    HistoryComponent
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
    MatGridListModule
  ],
  providers: [ AppService ],  // 作成したサービスを登録
  bootstrap: [AppComponent]
})
export class AppModule { }
