import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MAT_DATE_LOCALE, MatTableDataSource } from '@angular/material';


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

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

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

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

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
