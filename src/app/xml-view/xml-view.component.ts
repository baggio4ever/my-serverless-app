import { Element } from './../history/history.component';
import {
  Component,
  OnInit,
  AfterViewInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy,
  ViewChild, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';

/*import * as format from 'xml-formatter';*/
import * as vkbeautify from 'vkbeautify';


class JdfTag {
  id: string;
  type: string;
  body: string;
  descriptiveName: string;
  jobId: string;
  jobPartId: string;

  constructor(id: string, type: string, descriptiveName: string, jobId: string, jobPartId: string, body: string) {
    this.id = id;
    this.type = type;
    this.descriptiveName = descriptiveName;

    this.jobId = jobId;
    this.jobPartId = jobPartId;

    this.body = body;
  }
}

class DeviceTag {
  id: string;
  klass: string;
  deviceId: string;
  friendlyName: string;
  body: string;

  constructor(id: string, klass: string, deviceId: string, friendlyName: string, body: string) {
    this.id = id;
    this.klass = klass;
    this.deviceId = deviceId;
    this.friendlyName = friendlyName;

    this.body = body;
  }
}

class ComponentTag {
  id: string;
  componentType: string;
  klass: string;
  dimensions: string;
  body: string;

  constructor(id: string, componentType: string, klass: string, dimensions: string, body: string) {
    this.id = id;
    this.componentType = componentType;
    this.klass = klass;
    this.dimensions = dimensions;

    this.body = body;
  }
}

class StitchingParamsTag {
  id: string;
  klass: string;
  numberOfStitches: string;
  stapleShape: string;
  body: string;

  constructor(id: string, klass: string, numberOfStitches: string, stapleShape: string, body: string) {
    this.id = id;
    this.klass = klass;
    this.numberOfStitches = numberOfStitches;
    this.stapleShape = stapleShape;

    this.body = body;
  }
}

class TrimmingParamsTag {
  id: string;
  klass: string;
  trimmingType: string;
  height: string;
  width: string;
  body: string;

  constructor(id: string, klass: string, trimmingType: string, height: string, width: string, body: string) {
    this.id = id;
    this.klass = klass;
    this.trimmingType = trimmingType;
    this.height = height;
    this.width = width;

    this.body = body;
  }
}

class FoldingParamsTag {
  id: string;
  klass: string;
  descriptionType: string;
  foldCatalog: string;
  folds: FoldTag[];
  body: string;

  constructor( id: string, klass: string, descriptionType: string, foldCatalog: string, folds: FoldTag[], body: string ) {
    this.id = id;
    this.klass = klass;
    this.descriptionType = descriptionType;
    this.foldCatalog = foldCatalog;
    this.folds = folds;

    this.body = body;
  }
}

class FoldTag {
  to: string;
  from: string;
  travel: string;

  constructor( to: string, from: string, travel: string ) {
    this.to = to;
    this.from = from;
    this.travel = travel;
  }
}


declare var hljs: any;

@Component({
  selector: 'app-xml-view',
  templateUrl: './xml-view.component.html',
  styleUrls: ['./xml-view.component.css']
})
export class XmlViewComponent implements OnChanges, OnInit, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  fileSelected = false;
  xml = '';

  jobTag: JdfTag = null;
  processTags: JdfTag[] = [];
  componentTags: ComponentTag[] = [];
  deviceTags: DeviceTag[] = [];
  stitchingParamsTags: StitchingParamsTag[] = [];
  trimmingParamsTags: TrimmingParamsTag[] = [];
  foldingParamsTags: FoldingParamsTag[] = [];

  /*
  @ViewChild('code')
  codeElement: ElementRef;
  */
  constructor() { }

  ngOnChanges( changes: SimpleChanges ) {
    console.log('OnChanges');

    for ( const propName in changes ) {
      const change: SimpleChange = changes[propName];
      console.log('変更されたプロパティ名：' + propName);
      console.log('変更前の値：' + change.previousValue);
      console.log('変更後の値：' + change.currentValue);
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
/*
Directive作って引っ越してみる

    // ここなら効く感じ
    hljs.highlightBlock(this.codeElement.nativeElement);
    console.log('highlightBlock()');
  */
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

//    this.texts = [];
    console.log(fileVal);
    console.log( 'typeof(fileVal.name):' + typeof(fileVal.name));

    reader.onload = (e) => {
      const c = reader.result;

      // エスケープ。angularにも備わっているみたいだけど。これやらないと表示されない。
      //      this.xml = this.escapeHTML( c );
      this.xml = vkbeautify.xml( c );  // お、innerHTMLにバインドしようとするとエスケープが必要だったが、textContentだとエスケープ不要みたい
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

        // 初期化
        this.jobTag = null;
        this.processTags = [];
        this.componentTags = [];
        this.componentTags = [];
        this.deviceTags = [];
        this.stitchingParamsTags = [];
        this.trimmingParamsTags = [];

        // JDFタグ
        const jdfTags = dom.getElementsByTagName('JDF');
        console.log('jdfTags.length: ' + jdfTags.length);
        for (let i = 0; i < jdfTags.length; ++i ) {
          const j = jdfTags[i];
          const id = j.getAttribute('ID');
          const type = j.getAttribute('Type');
          const dn = j.getAttribute('DescriptiveName');
          const jobId = j.getAttribute('JobID');
          const jobPartId = j.getAttribute('JobPartID');
          const body = vkbeautify.xml( j.outerHTML.toString() );
//          const body = j.outerHTML.toString();
//          console.log(j);
//          this.texts.push( jdfTags[i].innerHTML );
//            this.texts.push( jdfTags[i].innerHTML );
//          this.texts.push('ID = ' + id + ',Type = ' + type + ',DescriptiveName = ' + dn );
          const jdfTag = new JdfTag( id, type, dn, jobId, jobPartId, body );
          if ( j.parentElement === null /* type === 'ProcessGroup'*/ ) {
            this.jobTag = jdfTag;
          } else {
            this.processTags.push( jdfTag );
          }
        }

        // Componentタグ
        const componentTags = dom.getElementsByTagName('Component');
        console.log('componentTags.length: ' + componentTags.length);
        for (let i = 0; i < componentTags.length; ++i ) {
          const j = componentTags[i];
          const id = j.getAttribute('ID');
          const componentType = j.getAttribute('ComponentType');
          const klass = j.getAttribute('Class');
          const dimensions = j.getAttribute('Dimensions');
          const body = vkbeautify.xml( j.outerHTML.toString() );
//          const body = j.outerHTML.toString();

          const componentTag = new ComponentTag( id, componentType, klass, dimensions, body );
          this.componentTags.push( componentTag );
        }

        // Deviceタグ
        const deviceTags = dom.getElementsByTagName('Device');
        console.log('deviceTags.length: ' + deviceTags.length);
        for (let i = 0; i < deviceTags.length; ++i ) {
          const j = deviceTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const deviceId = j.getAttribute('DeviceID');
          const friendlyName = j.getAttribute('FriendlyName');
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const deviceTag = new DeviceTag( id, klass, deviceId, friendlyName, body );
          this.deviceTags.push( deviceTag );
        }

        // StitchingParamsタグ
        const stitchingParamsTags = dom.getElementsByTagName('StitchingParams');
        console.log('stitchingParamsTags.length: ' + stitchingParamsTags.length);
        for (let i = 0; i < stitchingParamsTags.length; ++i ) {
          const j = stitchingParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const numberOfStitches = j.getAttribute('NumberOfStitches');
          const stapleShape = j.getAttribute('StapleShape');
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const stitchingParamsTag = new StitchingParamsTag( id, klass, numberOfStitches, stapleShape, body );
          this.stitchingParamsTags.push( stitchingParamsTag );
        }

        // TrimmingParamsタグ
        const trimmingParamsTags = dom.getElementsByTagName('TrimmingParams');
        console.log('trimmingParamsTags.length: ' + trimmingParamsTags.length);
        for (let i = 0; i < trimmingParamsTags.length; ++i ) {
          const j = trimmingParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const trimmingType = j.getAttribute('TrimmingType');
          const height = j.getAttribute('Height');
          const width = j.getAttribute('Width');
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const trimmingParamsTag = new TrimmingParamsTag( id, klass, trimmingType, width, height, body );
          this.trimmingParamsTags.push( trimmingParamsTag );
        }

        // FoldingParamsタグ
        const foldingParamsTags = dom.getElementsByTagName('FoldingParams');
        console.log('foldingParamsTags.length: ' + foldingParamsTags.length);
        for (let i = 0; i < foldingParamsTags.length; ++i ) {
          const j = foldingParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const descriptionType = j.getAttribute('DescriptionType');
          const foldCatalog = j.getAttribute('FoldCatalog');
          const folds: FoldTag[] = [];
//          console.log('before: ' + j.outerHTML.toString());
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );
//          console.log('after: ' + body);

          const foldingParamsTag = new FoldingParamsTag( id, klass, descriptionType, foldCatalog, folds, body );
          this.foldingParamsTags.push( foldingParamsTag );
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

/*
  yes2() {
    hljs.highlightBlock(this.codeElement.nativeElement);
    console.log('yes2()');
  }
*/
}
