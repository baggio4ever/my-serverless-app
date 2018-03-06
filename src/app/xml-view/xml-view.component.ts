import { Element } from './../history/history.component';
import {
  Component,
  OnInit,
  AfterViewInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewChecked, OnDestroy,
  ViewChild, ElementRef, SimpleChanges, SimpleChange } from '@angular/core';

import * as vkbeautify from 'vkbeautify';
import * as Cytoscape from 'cytoscape';
import { Guid } from "guid-typescript";
import * as klay from 'cytoscape-klay';

Cytoscape.use(klay);

class BaseTag {
  guid: string; // Cytoscapeで使えないかしら

  constructor() {
    this.guid = Guid.create().toString();
  }
}

class IdHavingTag extends BaseTag {
  id: string;
  constructor(id: string){
    super();

    this.id = id;
  }
}

class JdfTag extends IdHavingTag {
  type: string;
  body: string;
  descriptiveName: string;
  jobId: string;
  jobPartId: string;
  inputComponentLinks: ComponentLinkTag[] = [];
  outputComponentLinks: ComponentLinkTag[] = [];
  paramsLinks: LinkTag[] = [];
  deviceLinks: LinkTag[] = [];

  constructor(id: string, type: string, descriptiveName: string, jobId: string, jobPartId: string,
      inputComponentLinks: ComponentLinkTag[], outputComponentLinks: ComponentLinkTag[], paramsLinks: LinkTag[],
      deviceLinks: LinkTag[], body: string) {
    super(id);

    this.type = type;
    this.descriptiveName = descriptiveName;

    this.jobId = jobId;
    this.jobPartId = jobPartId;

    this.inputComponentLinks = inputComponentLinks;
    this.outputComponentLinks = outputComponentLinks;
    this.paramsLinks = paramsLinks;
    this.deviceLinks = deviceLinks;

    this.body = body;
  }
}

class DeviceTag extends IdHavingTag {
  klass: string;
  deviceId: string;
  friendlyName: string;
  body: string;

  constructor(id: string, klass: string, deviceId: string, friendlyName: string, body: string) {
    super(id);

    this.klass = klass;
    this.deviceId = deviceId;
    this.friendlyName = friendlyName;

    this.body = body;
  }
}

class ComponentTag extends IdHavingTag {
  componentType: string;
  klass: string;
  dimensions: string;
  body: string;

  constructor(id: string, componentType: string, klass: string, dimensions: string, body: string) {
    super(id);

    this.componentType = componentType;
    this.klass = klass;
    this.dimensions = dimensions;

    this.body = body;
  }

  getDimensions_mm(): string {
//    return this.dimensions;
    if (this.dimensions) {
    return this.dimensions
      .split(' ')
      .map( (v,i,a) => {
        return JDFUtils.pt2mm( JDFUtils.parseNumber(v) );
      })
      .join(' ');
    } else {
      return '記述なし';
    }
  }
}

class StitchingParamsTag extends IdHavingTag  {
  klass: string;
  numberOfStitches: string;
  stapleShape: string;
  body: string;

  constructor(id: string, klass: string, numberOfStitches: string, stapleShape: string, body: string) {
    super(id);

    this.klass = klass;
    this.numberOfStitches = numberOfStitches;
    this.stapleShape = stapleShape;

    this.body = body;
  }
}

class TrimmingParamsTag  extends IdHavingTag {
  klass: string;
  noOp: string;
  trimmingType: string;
  height: string;
  width: string;
  trimmingOffset: string;
  body: string;

  constructor(id: string, klass: string, noOp: string, trimmingType: string,
       height: string, width: string, trimmingOffset: string, body: string) {
    super(id);

    this.klass = klass;
    this.noOp = noOp;
    this.trimmingType = trimmingType;
    this.height = height;
    this.width = width;
    this.trimmingOffset = trimmingOffset;

    this.body = body;
  }

  getWidth_mm(): number {
    return JDFUtils.pt2mm( JDFUtils.parseNumber(this.width) );
  }

  getHeight_mm(): number {
    return JDFUtils.pt2mm( JDFUtils.parseNumber(this.height) );
  }
}

class FoldingParamsTag  extends IdHavingTag {
  klass: string;
  descriptionType: string;
  foldCatalog: string;
  folds: FoldTag[];
  body: string;

  constructor( id: string, klass: string, descriptionType: string, foldCatalog: string, folds: FoldTag[], body: string ) {
    super(id);

    this.klass = klass;
    this.descriptionType = descriptionType;
    this.foldCatalog = foldCatalog;
    this.folds = folds;

    this.body = body;
  }
}

class FoldTag  extends BaseTag {
  to: string;
  from: string;
  travel: string;

  constructor( to: string, from: string, travel: string ) {
    super();

    this.to = to;
    this.from = from;
    this.travel = travel;
  }

  getTravel_mm(): number {
    return JDFUtils.pt2mm( JDFUtils.parseNumber( this.travel ) );
  }
}

class CuttingParamsTag  extends IdHavingTag {
  klass: string;
  cutBlocks: CutBlockTag[];
  body: string;

  constructor( id: string, klass: string, cutBlocks: CutBlockTag[], body: string ) {
    super(id);

    this.klass = klass;
    this.cutBlocks = cutBlocks;

    this.body = body;
  }
}

class CutBlockTag  extends IdHavingTag {
  klass: string;
  blockType: string;
  blockName: string;
  blockSize: string;
  blockTrf: string;
  body: string;

  constructor( id: string, klass: string, blockType: string, blockName: string, blockSize: string, blockTrf: string, body: string ) {
    super(id);

    this.klass = klass;
    this.blockType = blockType;
    this.blockName = blockName;
    this.blockSize = blockSize;
    this.blockTrf = blockTrf;

    this.body = body;
  }
}

class CoverApplicationParamsTag  extends IdHavingTag {
  klass: string;
  noOp: string;
  body: string;

  constructor( id: string, klass: string, noOp: string, body: string ) {
    super(id);

    this.klass = klass;
    this.noOp = noOp;

    this.body = body;
  }
}

class SpinePreparationParamsTag  extends IdHavingTag {
  klass: string;
  millingDepth: string;
  body: string;

  constructor( id: string, klass: string, millingDepth: string, body: string ) {
    super(id);

    this.klass = klass;
    this.millingDepth = millingDepth;

    this.body = body;
  }
}

class LinkTag  extends BaseTag {
  usage: string;
  rRef: string;
  amount: string;

  constructor( usage: string, rRef: string, amount: string ) {
    super();

    this.usage = usage;
    this.rRef = rRef;
    this.amount = amount;
  }
}

class ComponentLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class CoverApplicationParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class SpinePrearationParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class StitchingParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class TrimmingParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class CuttingParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class FoldingParamsLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}

class DeviceLinkTag extends LinkTag {
  constructor( usage: string, rRef: string, amount: string ) {
    super( usage, rRef, amount );
  }
}



// JMF
class JMF {
  senderId: string;
  timeStamp: string;
  queryTags: QueryTag[] = [];
  body: string;

  constructor( senderId: string, timeStamp: string, queryTags: QueryTag[], body: string ) {
    this.senderId = senderId;
    this.timeStamp = timeStamp;
    this.queryTags = queryTags;

    this.body = body;
  }
}


class QueryTag  extends IdHavingTag {
  type: string;
  statusQuParamsTags: StatusQuParamsTag[] = [];
  body: string;

  constructor( id: string, type: string, statusQuParamsTags: StatusQuParamsTag[], body: string ) {
    super(id);

    this.type = type;
    this.statusQuParamsTags = statusQuParamsTags;

    this.body = body;
  }
}

class StatusQuParamsTag extends BaseTag {
  deviceDetails: string;
  body: string;

  constructor( deviceDetails: string, body: string ) {
    super();

    this.deviceDetails = deviceDetails;

    this.body = body;
  }
}

class SignalTag  extends IdHavingTag {
  type: string;
  deviceInfoTags: DeviceInfoTag[] = [];
  body: string;

  constructor( id: string, type: string, deviceInfoTags: DeviceInfoTag[], body: string ) {
    super(id);

    this.type = type;
    this.deviceInfoTags = deviceInfoTags;

    this.body = body;
  }
}

class DeviceInfoTag extends BaseTag {
  deviceStatus: string;
  deviceTag: DeviceTag;
  jobPhaseTags: JobPhaseTag[] = [];
  body: string;

  constructor( deviceStatus: string, deviceTag: DeviceTag, jobPhaseTags: JobPhaseTag[], body: string ) {
    super();

    this.deviceStatus = deviceStatus;
    this.deviceTag = deviceTag;
    this.jobPhaseTags = jobPhaseTags;

    this.body = body;
  }
}

/*
class DeviceTag {  <- JDFのやつと一緒なのかな
	klass: string;
	deviceId: string;
}
*/

class JobPhaseTag extends BaseTag  {
  status: string;
  jobPartId: string;
  jobId: string;
  startTime: string;
  totalAmount: string;
  amount: string;
  waste: string;
  body: string;

  constructor( status: string, jobParId: string, jobId: string, startTime: string,
       totalAmount: string, amount: string, waste: string, body: string ) {
    super();

    this.status = status;
    this.jobPartId = jobParId;
    this.jobId = jobId;
    this.startTime = startTime;
    this.totalAmount = totalAmount;
    this.amount = amount;
    this.waste = waste;

    this.body = body;
  }
}


class JDFUtils {
  private constructor() {}

  static parseNumber( s: string ): number {
    return parseFloat(s);
  }

  static getWidth( dimensions: string ): string {
    return '';
  }
  static getLength( dimensions: string ): string {
    return '';
  }
  static getThickness( dimensions: string ): string {
    return '';
  }

  static pt2mm( v: number ): number {
    return this.inch2mm( this.pt2inch(v) );
  }

  static pt2inch( v: number ): number {
    return (v / 72.0);
  }

  static inch2pt( v: number ): number {
    return (v * 72.0);
  }

  static mm2inch( v: number ): number {
    return (v / 25.4);
  }

  static inch2mm( v: number ): number {
    return (v * 25.4);
  }
}

export interface ElementX {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

/*
const ELEMENT_DATA: ElementX[] = [
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
*/

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
  cuttingParamsTags: CuttingParamsTag[] = [];
  coverApplicationParamsTags: CoverApplicationParamsTag[] = [];
  spinePreparationParamsTags: SpinePreparationParamsTag[] = [];

  selectedGuid = '';

//  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  displayedColumns2 = ['id', 'class', 'blockType', 'blockName', 'blockSize', 'blockTrf'];
  displayedColumns3 = ['to', 'from', 'travel', 'travel_mm'];
//  dataSource = ELEMENT_DATA;

  cy = null;

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
//    console.log('OnInit');
  }

  ngDoCheck() {
//    console.log('DoCheck');
  }

  ngAfterContentInit() {
//    console.log('AfterContentInit');
  }

  ngAfterContentChecked() {
//    console.log('AfterContentChecked');
  }

  ngAfterViewInit() {
//    console.log('AfterViewInit');
//    Cytoscape.use( klay );
    this.cy = Cytoscape({
      container: document.getElementById('cy'), // container to render in

      elements: [ // list of graph elements to start with
        { // node a
          data: { id: 'a' }
        },
        { // node b
          data: { id: 'b' }
        },
        { // edge ab
          data: { id: 'ab', source: 'a', target: 'b' }
        }
      ],

      style: [ // the stylesheet for the graph
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(id)'
          }
        },
        {
          selector: '.process',
          style: {
            'background-color': '#666',
            'label': 'data(tag_id)'
          }
        },
        {
          selector: '.component',
          style: {
            'background-color': '#666',
            'label': 'data(tag_id)',
            'shape': 'rectangle'
          }
        },
        {
          selector: '.params',
          style: {
            'background-color': '#666',
            'label': 'data(tag_id)',
            'shape': 'tag'
          }
        },
        {
          selector: '.device',
          style: {
            'background-color': '#666',
            'label': 'data(tag_id)',
            'shape': 'roundrectangle'
          }
        },
        {
          selector: ':selected',
          style: {
            'background-color': '#b22',
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
          }
        },
        {
          selector: '.uni-arrow',
          style: {
            'curve-style': 'bezier',
            'width': 2,
            'line-color': '#999',
//            'arrow-scale': 3,
            'target-arrow-color': '#999',
            'target-arrow-shape': 'triangle',
//            'target-endpoint': 'outside-to-node',
//            'source-arrow-color': '#088',
//            'source-arrow-shape': 'triangle',
          }
        }
      ],

      layout: {
        name: 'grid',
        rows: 1
      }

    });
  }

  ngAfterViewChecked() {
//    console.log('AfterViewChecked');
  }

  ngOnDestroy() {
//    console.log('OnDestroy');
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

  doLayout(): void {
    const codes = document.getElementsByTagName('code');
    console.log('codes.length: ' + codes.length);
    for ( let i = 0; i < codes.length; i ++ ) {
      const co = codes[i];
      hljs.highlightBlock(co);
    }
  }

  do1(): void {
    this.cy.style().selector('edge').style({
            'width': 1,
            'line-color': '#f00'
    }).update();
  }

  do2(): void {
    this.cy.add([
        { // node a
          data: { id: 'X' }
        },
        { // node b
          data: { id: 'Y' }
        },
        { // node b
          data: { id: 'Z' }
        },
        { // edge ab
          data: { id: 'bX', source: 'b', target: 'X' }
        },
        { // edge ab
          data: { id: 'XY', source: 'X', target: 'Y' }
        },
        { // edge ab
          data: { id: 'XZ', source: 'X', target: 'Z' }
        },
    ]);
    this.cy.fit();
  }

  do3(): void {
    this.cy.$id('a').addClass('funny');
    this.cy.$id('Y').addClass('funny');
  }

  do4(): void {
    this.cy.remove('node');  // 全削除のつもり
    this.cy.add([
      {
        data: {id:'1'}
      },
      {
        data: {id:'2'}
      },
      {
        data: { id:'a', source:'1', target:'2' }
      }
    ]);
    const l = this.cy.layout({
      name: 'grid'
    });
    l.run();
    this.cy.fit();
  }

  do5(): void {
    this.makeGraph();
  }

  makeGraph(): void {
    // 全削除のつもり
    this.cy.remove('node');

    // イベント
    this.cy.on('tap','node',(evt) => {
      const target = evt.target;
      const tag_id = target.data('tag_id');
      console.log('tapped: ' + tag_id);
      if (tag_id) {
//        target.select();
        this.scrollTo(tag_id);
      }
    });
    this.cy.on('select','node',(evt) => {
      const target = evt.target;
      const id = target.id();
      console.log('select: ' + id);
      if (id) {
        this.selectedGuid = id;
//        target.select();
//        this.scrollTo(tag_id);
      }
    });
    this.cy.on('unselect','node',(evt) => {
      const target = evt.target;
      const id = target.id();
      console.log('unselect: ' + id);
      this.selectedGuid = '';

      if (id) {
//        target.select();
//        this.scrollTo(tag_id);
      }
    });
/*
    this.cy.on('tap','.process',(evt) => {
      const target = evt.target;
      console.log('tapped: '+target.data('tag_id');
    });
*/
    // componentノード作成
    this.componentTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('component');
    });

    // processノード作成
    this.processTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('process');
    });

    // deviceノード作成
    this.deviceTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('device');
    });

    // StitchingParamsノード作成
    this.stitchingParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    // TrimmingParamsノード作成
    this.trimmingParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    // FoldingParamsノード作成
    this.foldingParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    // CuttingParamsノード作成
    this.cuttingParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    // CoverApplicationParamsノード作成
    this.coverApplicationParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    // SpinePreparationParamsノード作成
    this.spinePreparationParamsTags.forEach( (v,i,a) => {
      this.cy.add([
        {
          data: {
            id: v.guid,
            tag_id: v.id
          }
        }
      ]).addClass('params');
    });

    this.processTags.forEach((v,i,a)=>{
      // process - component（入力）エッジ
      v.inputComponentLinks.forEach((d,idx,ar)=>{
        const aGuid = Guid.create().toString();
        const component = this.getComponentTagById(d.rRef);
        if( component ) {
          this.cy.add([
            { // edge 
              data: { id: aGuid, source: component.guid, target: v.guid  }
            },
          ]).addClass('uni-arrow');
        }
      });
      // process - component（出力）エッジ
      v.outputComponentLinks.forEach((d,idx,ar)=>{
        const aGuid = Guid.create().toString();
        const component = this.getComponentTagById(d.rRef);
        if( component ) {
          this.cy.add([
            { // edge 
              data: { id: aGuid, source: v.guid, target: component.guid  }
            },
          ]).addClass('uni-arrow');
        }
      });

      // process - deviceエッジ
      v.deviceLinks.forEach((d,idx,ar)=>{
        const aGuid = Guid.create().toString();
        const device = this.getDeviceTagById(d.rRef);
        if( device ) {
          this.cy.add([
            { // edge 
              data: { id: aGuid, source: v.guid, target: device.guid  }
            },
          ]);
        }
      });

      // process - paramsエッジ
      v.paramsLinks.forEach((d,idx,ar)=>{
        const aGuid = Guid.create().toString();
        const params = this.getParamsTagById(d.rRef);
        if( params ) {
          this.cy.add([
            { // edge 
              data: { id: aGuid, source: v.guid, target: params.guid  }
            },
          ]);
        } else {
          console.log('getParamsTagById ないす: '　+ d.rRef);
        }
      });
    });

    // レイアウト
/*    const l = this.cy.layout({
      name: 'klay'
    });
    l.run();
*/  
//    this.cy.use(klay);
    const l = this.cy.layout({
      name: 'klay'
    });
    l.run();
    this.cy.fit();
  }

  getComponentTagById( id: string ): ComponentTag {
    let ret:ComponentTag = null;
    for( let i=0;i<this.componentTags.length;i++ ) {
      const componentTag = this.componentTags[i];
      if(componentTag.id === id) {
        ret = componentTag;
        break;
      }
    }
    return ret;
  }

  getDeviceTagById( id: string ): DeviceTag {
    let ret:DeviceTag = null;
    for( let i=0;i<this.deviceTags.length;i++ ) {
      const deviceTag = this.deviceTags[i];
      if(deviceTag.id === id) {
        ret = deviceTag;
        break;
      }
    }
    return ret;
  }

  // うーん。いまいち。
  getParamsTagById( id: string ): IdHavingTag {
    let r;

    if ( r = this.coverApplicationParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    if ( r = this.cuttingParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    if ( r = this.foldingParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    if ( r = this.stitchingParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    if ( r = this.spinePreparationParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    if ( r = this.trimmingParamsTags.find((v,i,a) => {return v.id===id;})) {
      return r;
    }

    return null;
  }

  yes(fileVal) {
    const file = fileVal;
    const fileName: string = fileVal.name;
    const reader = new FileReader();

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
//      console.log('xml:' + this.xml);

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

        setTimeout(() => { // チョイ待たせて整形。
          this.doLayout();
        }, 0);

        // 初期化
        this.jobTag = null;
        this.processTags = [];
        this.componentTags = [];
        this.componentTags = [];
        this.deviceTags = [];
        this.stitchingParamsTags = [];
        this.trimmingParamsTags = [];
        this.foldingParamsTags = [];
        this.cuttingParamsTags = [];
        this.coverApplicationParamsTags = [];
        this.spinePreparationParamsTags = [];

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
          const noOp = j.getAttribute('NoOp');
          const trimmingType = j.getAttribute('TrimmingType');
          const height = j.getAttribute('Height');
          const width = j.getAttribute('Width');
          const trimmingOffset = j.getAttribute('TrimmingOffset');
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const trimmingParamsTag = new TrimmingParamsTag( id, klass, noOp, trimmingType, width, height, trimmingOffset, body );
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
//          const body = j.outerHTML.toString();
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const fBlocks = j.getElementsByTagName('Fold');
          for ( let ff = 0; ff < fBlocks.length; ++ ff ) {
            const x = fBlocks[ff];
            const x_to = x.getAttribute('To');
            const x_from = x.getAttribute('From');
            const x_travel = x.getAttribute('Travel');
            const ft = new FoldTag(x_to, x_from, x_travel);
            folds.push( ft );
          }
          const foldingParamsTag = new FoldingParamsTag( id, klass, descriptionType, foldCatalog, folds, body );
          this.foldingParamsTags.push( foldingParamsTag );
        }

        // CuttingParamsタグ
        const cuttingParamsTags = dom.getElementsByTagName('CuttingParams');
        console.log('cuttingParamsTags.length: ' + cuttingParamsTags.length);
        for (let i = 0; i < cuttingParamsTags.length; ++i ) {
          const j = cuttingParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const cutBlocks: CutBlockTag[] = [];
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const cBlocks = j.getElementsByTagName('CutBlock');
          for ( let cc = 0; cc < cBlocks.length; ++ cc ) {
            const x = cBlocks[cc];
            const x_id = x.getAttribute('ID');
            const x_class = x.getAttribute('Class');
            const x_blockType = x.getAttribute('BlockType');
            const x_blockName = x.getAttribute('BlockName');
            const X_blockSize = x.getAttribute('BlockSize');
            const x_blockTrf = x.getAttribute('BlockTrf');
            const cbt = new CutBlockTag(x_id, x_class, x_blockType, x_blockName, X_blockSize, x_blockTrf,
                 vkbeautify.xml(x.outerHTML.toString()));
            cutBlocks.push(cbt);
          }

          const cuttingParamsTag = new CuttingParamsTag( id, klass, cutBlocks, body );
          this.cuttingParamsTags.push( cuttingParamsTag );
        }

        // CoverApplicationParamsタグ
        const coverApplicationParamsTags = dom.getElementsByTagName('CoverApplicationParams');
        console.log('coverApplicationParamsTags.length: ' + coverApplicationParamsTags.length);
        for (let i = 0; i < coverApplicationParamsTags.length; ++i ) {
          const j = coverApplicationParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const noOp = j.getAttribute('NoOp');
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const coverApplicationParamsTag = new CoverApplicationParamsTag( id, klass, noOp, body );
          this.coverApplicationParamsTags.push( coverApplicationParamsTag );
        }

        // SpinePreparationParamsタグ
        const spinePreparationParamsTags = dom.getElementsByTagName('SpinePreparationParams');
        console.log('spinePreparationParamsTags.length: ' + spinePreparationParamsTags.length);
        for (let i = 0; i < spinePreparationParamsTags.length; ++i ) {
          const j = spinePreparationParamsTags[i];
          const id = j.getAttribute('ID');
          const klass = j.getAttribute('Class');
          const millingDepth = j.getAttribute('MillingDepth');
          const body = vkbeautify.xml( j.outerHTML.toString() );

          const spinePreparationParamsTag = new SpinePreparationParamsTag( id, klass, millingDepth, body );
          this.spinePreparationParamsTags.push( spinePreparationParamsTag );
        }

        // JDFタグ  最後が良い、多分。参照したいデータが揃っているはずなので
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

          const inputComponentLinks: ComponentLinkTag[] = [];
          const outputComponentLinks: ComponentLinkTag[] = [];
          const paramsLinks: LinkTag[] = [];
          const deviceLinks: LinkTag[] = [];
          const linkPools = j.getElementsByTagName('ResourceLinkPool');
          if ( linkPools.length === 1) {
            for ( let k = 0; k < linkPools[0].children.length; k++ ) {
              const comp = linkPools[0].children[k];
              let usage = '';
              let rRef = '';
              let amount = '';
              switch ( comp.tagName ) {
                case 'ComponentLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  amount = comp.getAttribute('Amount');
                  const cl = new ComponentLinkTag(usage, rRef, amount);
                  if ( usage.toLowerCase() === 'input' ) {
                    inputComponentLinks.push(cl);
                  } else {
                    outputComponentLinks.push(cl)
                  }
                  break;
                case 'SpinePreparationParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  amount = comp.getAttribute('Amount');
                  const sppl = new SpinePrearationParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(sppl);
                  break;
                case 'CoverApplicationParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const capl = new CoverApplicationParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(capl);
                  break;
                case 'StitchingParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const spl = new StitchingParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(spl);
                  break;
                case 'TrimmingParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const tpl = new TrimmingParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(tpl);
                  break;
                case 'CuttingParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const cpl = new CuttingParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(cpl);
                  break;
                case 'FoldingParamsLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const fpl = new FoldingParamsLinkTag( usage, rRef, amount );
                  paramsLinks.push(fpl);
                  break;
                case 'DeviceLink':
                  usage = comp.getAttribute('Usage');
                  rRef = comp.getAttribute('rRef');
                  const dl = new DeviceLinkTag( usage, rRef, amount );
                  deviceLinks.push(dl);
                  break;
                default:
                  console.log('default キター: ' + comp.tagName);
                  break;
              }
            }
          }
          const jdfTag = new JdfTag( id, type, dn, jobId, jobPartId,
              inputComponentLinks, outputComponentLinks, paramsLinks, deviceLinks, body );
          if ( j.parentElement === null /* type === 'ProcessGroup'*/ ) {
            this.jobTag = jdfTag;
          } else {
            this.processTags.push( jdfTag );
          }
        }
      }
    };

    reader.readAsText(file);
//    console.log('yes()');
  }

  // 引数で渡すコンポーネント（用紙とか）を作成した工程を返す
  getPreviousProcesses( component: ComponentTag ): JdfTag[] {
    let ret: JdfTag[] = [];

    ret = this.processTags.filter( (value,index,array) => {
      const r = value.outputComponentLinks.filter( (v,i,ary) => {
        return (v.rRef === component.id);
      });
      return (r.length > 0);
    });
    return ret;
  }

  // 引数で渡すコンポーネント（用紙とか）を使用する工程を返す
  getNextProcesses( component: ComponentTag ): JdfTag[] {
    let ret: JdfTag[] = [];

    ret = this.processTags.filter( (value,index,array) => {
      const r = value.inputComponentLinks.filter( (v,i,ary) => {
        return (v.rRef === component.id);
      });
      return (r.length > 0);
    });
    return ret;
  }

  // 引数で渡すデバイスを利用している工程を返す
  getProcessesUsingThisDevice( component: ComponentTag ): JdfTag[] {
    let ret: JdfTag[] = [];

    ret = this.processTags.filter( (value,index,array) => {
      const r = value.deviceLinks.filter( (v,i,ary) => {
        return (v.rRef === component.id);
      });
      return (r.length > 0);
    });
    return ret;
  }

  getProcessesUsingThisParams( component: ComponentTag ): JdfTag[] {
    let ret: JdfTag[] = [];

    ret = this.processTags.filter( (value,index,array) => {
      const r = value.paramsLinks.filter( (v,i,ary) => {
        return (v.rRef === component.id);
      });
      return (r.length > 0);
    });
    return ret;
  }

  scrollTo( tagName: string ): void {
    try {
      console.log('tagName: ' + tagName);
//      document.getElementById(tagName).scrollIntoView(true);
        document.getElementById(tagName).scrollIntoView( {behavior:'smooth',block:'center',inline:'center'});
    } catch (e) {
      console.log('error!:' + e);
    }
  }

  isSelected( guid: string ): boolean {
    if (this.selectedGuid === guid) {
      return true;
    } else {
      return false;
    }
  }
}
