import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxilistingComponent } from './taxilisting.component';

describe('TaxilistingComponent', () => {
  let component: TaxilistingComponent;
  let fixture: ComponentFixture<TaxilistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxilistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxilistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
