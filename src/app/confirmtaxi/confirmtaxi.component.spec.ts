import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmtaxiComponent } from './confirmtaxi.component';

describe('ConfirmtaxiComponent', () => {
  let component: ConfirmtaxiComponent;
  let fixture: ComponentFixture<ConfirmtaxiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmtaxiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmtaxiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
