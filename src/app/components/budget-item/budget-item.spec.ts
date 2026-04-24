import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetItem } from './budget-item';
import { ModalService } from '../../services/modal.service';
import type { Budget } from '../../interfaces/budget.interface';

describe('BudgetItem', () => {
  let component: BudgetItem;
  let fixture: ComponentFixture<BudgetItem>;

  const modalServiceMock = {
    openAlertModal: vi.fn(),
    closeModal: vi.fn(),
  };

  const budgetMock: Budget = {
    createdAt: '2026-04-24T00:00:00.000Z',
    name: 'Ada Lovelace',
    telephone: '+34600111222',
    email: 'ada@example.com',
    services: [],
    total: 500,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetItem],
      providers: [
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BudgetItem);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('budget', budgetMock);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render budget data', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.textContent).toContain('Ada Lovelace');
    expect(element.textContent).toContain('ada@example.com');
    expect(element.textContent).toContain('500');
  });
});
