import { TestBed } from '@angular/core/testing';

import { TimeloggerService } from './timelogger.service';

describe('TimeloggerService', () => {
  let service: TimeloggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeloggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
