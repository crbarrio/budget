import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('Budget', () => {
  let service: BudgetService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty budget list when local storage has no data', () => {
    expect(service.budgetArray).toEqual([]);
  });
});
