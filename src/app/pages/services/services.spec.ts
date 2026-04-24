import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import Services from './services';
import { BudgetService } from '../../services/budget.service';
import { ModalService } from '../../services/modal.service';

describe('Services', () => {
  let component: Services;
  let fixture: ComponentFixture<Services>;

  const budgetServiceMock = {
    budgetArray: [],
    setOrderBy: vi.fn(),
    saveBudget: vi.fn(),
  };

  const modalServiceMock = {
    openAlertModal: vi.fn(),
    closeModal: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Services],
      providers: [
        provideRouter([]),
        { provide: BudgetService, useValue: budgetServiceMock },
        { provide: ModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Services);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
