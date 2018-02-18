import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-view',
  templateUrl: './scroll-view.component.html',
  styleUrls: ['./scroll-view.component.css']
})
export class ScrollViewComponent implements OnInit {

  texts = [];
  flag = false;

  constructor() { }

  ngOnInit() {
    for( let i = 0; i < 128; i++ ) {
      const t = 'サンプルテキスト。' ;
      this.texts.push( t );
    }
    window.onscroll = (e) => {
//      console.log('scroll!');
        this.flag = (window.pageYOffset>0)?true:false;
    };
  }

}
