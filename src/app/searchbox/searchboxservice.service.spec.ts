import { TestBed } from '@angular/core/testing';

import { SearchboxserviceService } from './searchboxservice.service';

describe('SearchboxserviceService', () => {
  let service: SearchboxserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchboxserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
