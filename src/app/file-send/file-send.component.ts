import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-send',
  templateUrl: './file-send.component.html',
  styleUrls: ['./file-send.component.css']
})
export class FileSendComponent implements OnInit {

  fileSelected = false;
  texts = [];
  
  constructor() { }

  ngOnInit() {
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
