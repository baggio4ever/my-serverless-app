import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit {

  fileSelected = false;
  texts = [];
  xml='<x></x>';

  constructor() { }

  ngOnInit() {
  }

  onChanged(filename) {
    console.log(filename);

    this.fileSelected = (filename !== '');
  }

  yes(fileVal) {
    const file = fileVal;
    const reader = new FileReader();

    console.log(fileVal);

    reader.onload = (e) => {
      'use strict';
      this.xml = reader.result;
      console.log('xml:'+this.xml);
/*
      const parser = new DOMParser();
      const dom = parser.parseFromString(xml, 'text/xml');

      const title = dom.getElementById('doc-title').textContent;

      console.log('title:' + title);

      const paragraphs = dom.getElementsByTagName('paragraph');
      for(let i = 0; i < paragraphs.length; ++i ){
        this.texts.push( paragraphs[i].innerHTML );
      }
*/
       };
    reader.readAsText(file);
    console.log('yes()');
  }
}
