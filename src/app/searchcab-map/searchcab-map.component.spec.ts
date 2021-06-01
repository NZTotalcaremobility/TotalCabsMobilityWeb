import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchcabMapComponent } from './searchcab-map.component';

describe('SearchcabMapComponent', () => {
  let component: SearchcabMapComponent;
  let fixture: ComponentFixture<SearchcabMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchcabMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchcabMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
