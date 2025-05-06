import { TestBed } from '@angular/core/testing';

import { SqlQueryObservableService } from './sql-query-observable.service';

describe('SqlQueryObservableService', () => {
  let service: SqlQueryObservableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SqlQueryObservableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
