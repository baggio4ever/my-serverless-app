import { AppService } from './app.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ AppService ]
})
export class AppComponent {
  constructor(private appService: AppService ) {}

  title = 'app';

  user_id = 'ichiro';
  message = 'かましたれ';

  texts = [];

  ngOnInit(): void {
    this.appService.getMessage(msg => {
      this.title = msg; // HTTP通信成功時にタイトルに取得したメッセージを表示する
    })
  }

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
    this.appService.getMessage3(msg => {
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
    })
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
}
