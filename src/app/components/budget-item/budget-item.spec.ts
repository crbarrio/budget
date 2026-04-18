import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItem } from './budget-item';

describe('BudgetItem', () => {
  let component: BudgetItem;
  let fixture: ComponentFixture<BudgetItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetItem],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
