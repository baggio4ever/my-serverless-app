import { Directive, ElementRef, AfterViewChecked, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';

declare var hljs: any;

@Directive({
  selector: 'code[appMyHighlight]'
})
export class MyHighlightDirective implements AfterViewChecked, AfterViewInit, OnChanges {

  constructor(private eltRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
/*
    console.log('my-highlight ngOnChanges !!!!!!!!!!!!!!!!!!!!!');
    for( const prop in changes ) {
      const change = changes[prop];
      console.log(`${prop}: ${change.firstChange}, ${change.previousValue} => ${change.currentValue}`);
    }
*/
  }

  ngAfterViewInit() {
/*
    console.log('my-highlight ngAfterViewInit');
    hljs.highlightBlock(this.eltRef.nativeElement);
  */
}

  ngAfterViewChecked() {
    // どうもこれだと呼ばれすぎる感じ。何とか必要十分な呼び出し回数に抑えられないものか
    console.log('my-highlight ngAfterViewChecked');
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
