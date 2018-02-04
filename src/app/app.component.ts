import { AppService } from './app.service';
import { Component } from '@angular/core';
import { Node } from '@angular/compiler';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ AppService ]
})
export class AppComponent implements OnInit {
  constructor(private appService: AppService ) {
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
  }

  title = 'app';

  user_id = 'ichiro';
  message = 'かましたれ';

  texts = [];

  fileSelected = false;

  ngOnInit(): void {
    this.appService.getMessage(msg => {
      this.title = msg; // HTTP通信成功時にタイトルに取得したメッセージを表示する
    });

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
  
  onChanged(filename) {
    console.log(filename);

    this.fileSelected = (filename !== '');
  }

  yes(fileVal) {
    let file = fileVal;
    let reader = new FileReader();

    console.log(fileVal);

    reader.onload = (e) => {
      'use strict';
      const xml = reader.result;

      const parser = new DOMParser();
      const dom = parser.parseFromString(xml, 'text/xml');

      const title = dom.getElementById('doc-title').textContent;

      console.log('title:'+title);

      const paragraphs = dom.getElementsByTagName('paragraph');
      for(let i=0;i<paragraphs.length;++i){
        this.texts.push( paragraphs[i].innerHTML );
      }
    };
    reader.readAsText(file);
    console.log('yes()');
  }
}
