import { TestBed } from '@angular/core/testing';

import { DropDownBarService } from './drop-down-bar.service';

describe('DropDownBarService', () => {
  let service: DropDownBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDownBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
