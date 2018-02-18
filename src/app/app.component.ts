import { AppService } from './app.service';
import { Component } from '@angular/core';
import { Node } from '@angular/compiler';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ AppService,

    /* datepickerの日本語表記： angular material のドキュメントを適当にコピペした。
    https://material.angular.io/components/datepicker/overview#choosing-a-date-implementation-and-date-format-settings
    これで良いのか？要継続調査 */
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
             ]
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService ) {
  }
  title = 'app';

  ngOnInit(): void {
    this.appService.getMessage(msg => {
      this.title = msg; // HTTP通信成功時にタイトルに取得したメッセージを表示する
    });

  }

}
