import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

declare var hljs: any;

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnInit, AfterViewInit {

  fileSelected = false;
  texts = [];
  xml = '';

  @ViewChild('code')
  codeElement:ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.codeElement.nativeElement);
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
//      this.xml = reader.result;
      this.xml = `&lt;html&gt;
                  &lt;body&gt;

                  &lt;h1&gt;My First Heading&lt;/h1&gt;
                  &lt;p&gt;My first paragraph.&lt;/p&gt;

                  &lt;/body&gt;
                &lt;/html&gt;`;

      console.log('xml:' + this.xml);

//      hljs.highlightBlock(this.codeElement.nativeElement);
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

  yes2() {
    hljs.highlightBlock(this.codeElement.nativeElement);
  }
}
