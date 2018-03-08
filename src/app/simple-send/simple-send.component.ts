import { AppService } from '../app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-send',
  templateUrl: './simple-send.component.html',
  styleUrls: ['./simple-send.component.css']
})
export class SimpleSendComponent implements OnInit {
  user_id = 'ichiro';
  message = 'かましたれ';

  texts = [];

  constructor( private appService: AppService ) {

    const last_user_id = localStorage.getItem('my_user_id');
    const last_message = localStorage.getItem('my_message');

    if ( last_user_id !== null ) {
      console.log('user_id みっけ');
      this.user_id = last_user_id;
    } else {
      console.log('user_id みつからず');
    }
    if ( last_message !== null ) {
      console.log('message みっけ');
      this.message = last_message;
    } else {
      console.log('message みつからず');
    }
  }

  ngOnInit() {
  }

  onClicked() {
    console.log('押されたよ');

    this.appService.getMessage2(msg => {
      this.texts.push(msg);
    });
  }

  onClearArray() {
    console.log('クリアだ');
    this.texts = [];
  }

  onClickedNow() {
    console.log('何時？');
    this.appService.getCurrentDateTime(msg => {
      this.texts.push(msg);
    });
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

    localStorage.setItem('my_user_id', this.user_id);
    localStorage.setItem('my_message', this.message);
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
