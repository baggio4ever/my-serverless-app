import { Component, OnInit } from '@angular/core';

const HISTORY_USER_ID = 'history_user_id';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user_id = '';

  constructor() {
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
  }

  canSearchLog():boolean {
    if ( this.user_id.trim() === '' ) {
      return false;
    }
    return true;
  }
}
