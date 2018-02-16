import { Directive, ElementRef, AfterViewChecked } from '@angular/core';

declare var hljs: any;

@Directive({
  selector: 'code[appMyHighlight]'
})
export class MyHighlightDirective implements AfterViewChecked {

  constructor(private eltRef: ElementRef) { }

  ngAfterViewChecked() {
    console.log('my-highlight ngAfterViewChecked');
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
