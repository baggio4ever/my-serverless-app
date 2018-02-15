import {
  Component,
  OnInit,
  AfterViewInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy,
  ViewChild, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';

declare var hljs: any;

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  fileSelected = false;
  texts = [];
  xml = '';

  @ViewChild('code')
  codeElement: ElementRef;

  constructor() { }

  ngOnChanges( changes: SimpleChanges ) {
    console.log('OnChanges');

    for( let propName in changes ) {
      let change:SimpleChange = changes[propName];
      console.debug("変更されたプロパティ名：" + propName);
      console.debug("変更前の値：" + change.previousValue);
      console.debug("変更後の値：" + change.currentValue);
    }
  }

  ngOnInit() {
    console.log('OnInit');
  }

  ngDoCheck() {
    console.log('DoCheck');
  }

  ngAfterContentInit() {
    console.log('AfterContentInit');
  }

  ngAfterContentChecked() {
    console.log('AfterContentChecked');
  }

  ngAfterViewInit() {
    console.log('AfterViewInit');

//    hljs.highlightBlock(this.codeElement.nativeElement);
  }

  ngAfterViewChecked() {
    console.log('AfterViewChecked');

    // ここなら効く感じ
    hljs.highlightBlock(this.codeElement.nativeElement);
    console.log('highlightBlock()');
  }

  ngOnDestroy() {
    console.log('OnDestroy');
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
      let c = reader.result;

      // エスケープ。angularにも備わっているみたいだけど。これやらないと表示されない。
      this.xml = c.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');

//      this.xml = reader.result;
/*
      this.xml = `&lt;html&gt;
                  &lt;body&gt;

                  &lt;h1&gt;My First Heading&lt;/h1&gt;
                  &lt;p&gt;My first paragraph.&lt;/p&gt;

                  &lt;/body&gt;
                &lt;/html&gt;`;
*/
      console.log('xml:' + this.xml);

      hljs.highlightBlock(this.codeElement.nativeElement);
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
    console.log('yes2()');
  }
}
