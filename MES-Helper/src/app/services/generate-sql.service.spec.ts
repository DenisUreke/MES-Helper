import { TestBed } from '@angular/core/testing';

import { GenerateSqlService } from './generate-sql.service';

describe('GenerateSqlService', () => {
  let service: GenerateSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
