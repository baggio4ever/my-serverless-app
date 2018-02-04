import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

const HISTORY_USER_ID = 'history_user_id';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user_id = '';
  result = '';

  constructor( private appService: AppService ) {
    const last_user_id = localStorage.getItem( HISTORY_USER_ID );

    if( last_user_id !== null ) {
      console.log( HISTORY_USER_ID + ' みっけ');
      this.user_id = last_user_id;
    } else {
      console.log( HISTORY_USER_ID + ' みつからず');
    }

  }

  ngOnInit() {
  }

  onSearchLog() {
    localStorage.setItem( HISTORY_USER_ID,this.user_id);

    console.log( this.user_id + ' で検索するっす');

    this.appService.getLogsYMD(this.user_id,2018,1,30,msg => {
      console.log( '返信来ましたよ' );
      console.log( 'typeof msg:'+typeof msg);
      console.log( 'toString.call(msg):'+toString.call( msg ));
      this.result = msg;
      console.log( 'toString.call(msg[0]:)'+toString.call( msg[0] ));
      console.log( "length:"+ msg.length );
      for(let i=0;i<msg.length;i++ ) {
        let a = msg[i];
        console.log( "" + a["user_id"] + " " + a["created_at"] + " " + a["message"] );
      }
    });
  }

  canSearchLog():boolean {
    if ( this.user_id.trim() === '' ) {
      return false;
    }
    return true;
  }
}
