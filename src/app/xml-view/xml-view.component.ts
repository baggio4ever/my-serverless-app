import { Element } from './../history/history.component';
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

  escapeHTML( s: string ): string {
    const ret = s.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

    return ret;
  }

  yes(fileVal) {
    const file = fileVal;
    const fileName: string = fileVal.name;
    const reader = new FileReader();

    this.texts = [];
    console.log(fileVal);
    console.log( 'typeof(fileVal.name):'+typeof(fileVal.name));;

    reader.onload = (e) => {
      const c = reader.result;

      // エスケープ。angularにも備わっているみたいだけど。これやらないと表示されない。
      //      this.xml = this.escapeHTML( c );
      this.xml = c;  // お、innerHTMLにバインドしようとするとエスケープが必要だったが、textContentだとエスケープ不要みたい
/*      this.xml = c.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
*/
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

      let passed = false;
      if ( fileName.toLowerCase().endsWith('jdf') ) {
        console.log('お、JDFだね');
        passed = true;
      } else {
        if ( fileName.toLowerCase().endsWith('jmf')) {
          console.log('おや、JMFですか');
          passed = true;
        } else {
          console.log('なんだ、その他ですか');
        }
      }

      if ( passed ) {
        const parser = new DOMParser();
        const dom = parser.parseFromString( c, 'text/xml');

//        const title = dom.getElementById('doc-title').textContent;

//        console.log('title:' + title);

        const jdfTags = dom.getElementsByTagName('JDF');
        console.log('jdfTags.length: ' + jdfTags.length);
        for (let i = 0; i < jdfTags.length; ++i ) {
          const jdfTag = jdfTags[i];
          const id = jdfTag.getAttribute('ID');
          const type = jdfTag.getAttribute('Type');
          const dn = jdfTag.getAttribute('DescriptiveName');
//          this.texts.push( jdfTags[i].innerHTML );
//            this.texts.push( jdfTags[i].innerHTML );
          this.texts.push('ID = ' + id + ',Type = ' + type + ',DescriptiveName = ' + dn );
        }
      }
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
    console.log('yes2()');
  }
}
