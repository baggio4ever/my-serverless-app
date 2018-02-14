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
/*
    const last_user_id = localStorage.getItem('my_user_id');
    const last_message = localStorage.getItem('my_message');

    if( last_user_id !== null ) {
      console.log('user_id みっけ');
      this.user_id = last_user_id;
    } else {
      console.log('user_id みつからず');
    }
    if( last_message !== null ) {
      console.log('message みっけ');
      this.message = last_message;
    } else {
      console.log('message みつからず');
    }
*/
  }
  title = 'app';

/*
  user_id = 'ichiro';
  message = 'かましたれ';

  texts = [];
*/

  ngOnInit(): void {
    this.appService.getMessage(msg => {
      this.title = msg; // HTTP通信成功時にタイトルに取得したメッセージを表示する
    });

  }

/*
  onClicked() {
    console.log('押されたよ');

    this.appService.getMessage2(msg => {
      this.texts.push(msg);
    })
  }

  onClearArray() {
    console.log('クリアだ');
    this.texts = [];
  }

  onClickedNow() {
    console.log('何時？');
    this.appService.getCurrentDateTime(msg => {
      this.texts.push(msg);
    })
  }

  onSendLog() {
    const body = {
            user_id: this.user_id,
            message: this.message
        };

    console.log('ログ書き込めぇ！');

    this.appService.postMessage(body, msg => {
      this.texts.push(msg);
    });

    localStorage.setItem('my_user_id',this.user_id);
    localStorage.setItem('my_message',this.message);
  }

  canSendLog(): boolean {
    if ( this.user_id.trim() === '' ) {
      return false;
    }
    if ( this.message.trim() === '' ) {
      return false;
    }
    return true;
  }
*/  
}
