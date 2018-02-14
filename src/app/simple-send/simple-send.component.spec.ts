import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSendComponent } from './simple-send.component';

describe('SimpleSendComponent', () => {
  let component: SimpleSendComponent;
  let fixture: ComponentFixture<SimpleSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
