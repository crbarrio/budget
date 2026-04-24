import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';

import BudgetDetails from './budget-details';
import { BudgetService } from '../../services/budget.service';
import { ModalService } from '../../services/modal.service';
import type { Budget } from '../../interfaces/budget.interface';

describe('BudgetDetails', () => {
  let component: BudgetDetails;
  let fixture: ComponentFixture<BudgetDetails>;

  const budgetMock: Budget = {
    createdAt: '2026-04-24T00:00:00.000Z',
    name: 'Ada Lovelace',
    telephone: '+34600111222',
    email: 'ada@example.com',
    services: [],
    total: 500,
  };

  const budgetServiceMock = {
    getBudgetById: vi.fn().mockReturnValue(budgetMock),
  };

  const modalServiceMock = {
    openAlertModal: vi.fn(),
    closeModal: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetDetails],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ budgetId: budgetMock.createdAt }),
          },
        },
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
