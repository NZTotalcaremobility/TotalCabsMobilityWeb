import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupIndividualComponent } from './signup-individual.component';

describe('SignupIndividualComponent', () => {
  let component: SignupIndividualComponent;
  let fixture: ComponentFixture<SignupIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
