import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MAT_DATE_LOCALE } from '@angular/material';


const HISTORY_USER_ID = 'history_user_id';
const HISTORY_SEARCH_DATE = 'history_search_date';

/**
 * 日付をフォーマットする  (https://qiita.com/osakanafish/items/c64fe8a34e7221e811d0 から頂きました。ありがとうございます)
 * @param  {Date}   date     日付
 * @param  {String} [format] フォーマット
 * @return {String}          フォーマット済み日付
 */
const formatDate = function (date, format) {
  if (!format) {
    format = 'YYYY-MM-DD hh:mm:ss.SSS';
  }
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
  if (format.match(/S/g)) {
    var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
    var length = format.match(/S/g).length;
    for (var i = 0; i < length; i++) {
      format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
  }
  return format;
};

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user_id = '';
  search_date = ''; // DatePickerとどうやったら双方向バインディング出来るんだろうか。別の方法でも良いんで、セットしたいね

  history_array = [];
  searching = false;

  constructor( private appService: AppService ) {
    const last_user_id = localStorage.getItem( HISTORY_USER_ID );
    const last_search_date = localStorage.getItem( HISTORY_SEARCH_DATE );

    if ( last_user_id !== null ) {
      console.log( HISTORY_USER_ID + ' みっけ');
      this.user_id = last_user_id;
    } else {
      console.log( HISTORY_USER_ID + ' みつからず');
    }
    if ( last_search_date !== null ) {
      console.log( HISTORY_SEARCH_DATE + ' みっけ');
      this.search_date = last_search_date;
    } else {
      console.log( HISTORY_SEARCH_DATE + ' みつからず');
      const today = new Date();
      this.search_date = formatDate( today,'YYYY/MM/DD' );
      console.log( 'this.search_date:'+this.search_date );
    }

  }

  ngOnInit() {
  }

  onSearchLog(val) {
    console.log('val: ' + val);
    console.log('typeof val: ' + typeof val);
    console.log('toString.call(val): ' + toString.call( val ));
    console.log( this.user_id + ' で検索するっす');
    this.searching = true;

    const d = (val as string).split('/');
    console.log('split:' + d);

    const today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    switch( d.length ) {
      case 1: // 指定年1月1日
        year = parseInt( d[0], 10 );
        month = parseInt( d[1], 10 );
        date = 1;
        break;
      case 2: // 指定年指定月1日
        year = parseInt( d[0], 10 );
        month = 1;
        date = 1;
        break;
      case 3: // 指定年月日
        year = parseInt( d[0], 10 );
        month = parseInt( d[1], 10 );
        date = parseInt( d[2], 10 );
        break;
      default:  // 今日
        break;
    }

    localStorage.setItem( HISTORY_USER_ID, this.user_id);
    localStorage.setItem( HISTORY_SEARCH_DATE, formatDate(today,'YYYY/MM/DD'));

    this.appService.getLogsYMD(this.user_id, year, month, date, msg => {
      console.log( '返信来ましたよ' );
      console.log( 'typeof msg:' + typeof msg);
      console.log( 'toString.call(msg):' + toString.call( msg ));
      this.history_array = msg;
      console.log( 'toString.call(msg[0]:)' + toString.call( msg[0] ));
      console.log( 'length:' + msg.length );
      for (let i = 0; i < msg.length; i++ ) {
        const a = msg[i];
        console.log( '' + a['user_id'] + ' ' + a['created_at'] + ' ' + a['message'] );
      }
      this.searching = false;
    });
  }

  canSearchLog(): boolean {
    if ( this.user_id.trim() === '' ) {
      return false;
    }
    return true;
  }
}
