import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiderLoginComponent } from './rider-login.component';

describe('RiderLoginComponent', () => {
  let component: RiderLoginComponent;
  let fixture: ComponentFixture<RiderLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiderLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
