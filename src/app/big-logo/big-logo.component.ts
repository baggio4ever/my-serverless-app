import { Component, OnInit,VERSION } from '@angular/core';

@Component({
  selector: 'app-big-logo',
  templateUrl: './big-logo.component.html',
  styleUrls: ['./big-logo.component.css']
})
export class BigLogoComponent implements OnInit {

  ng_version = VERSION;

  constructor() { }

  ngOnInit() {
  }

}
