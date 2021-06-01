import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCompnayComponent } from './signup-compnay.component';

describe('SignupCompnayComponent', () => {
  let component: SignupCompnayComponent;
  let fixture: ComponentFixture<SignupCompnayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupCompnayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupCompnayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
