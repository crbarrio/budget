import { Injectable } from '@angular/core';
import { Budget, BudgetOrderBy, BudgetOrderDirection } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly storageKey = 'budgets';

  budgetArray: Budget[] = this.loadBudgets();

  private loadBudgets(): Budget[] {
    const storedBudgets = localStorage.getItem(this.storageKey);

    if (!storedBudgets) {
      return [];
    }

    return JSON.parse(storedBudgets) as Budget[];
  }

  private persistBudgets() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.budgetArray));
  }

  async saveBudget(budget: Budget): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.budgetArray.push(budget);
        this.persistBudgets();
        resolve(true);
      }, 1000);
    });
  }

  setOrderBy(orderBy: BudgetOrderBy, direction: BudgetOrderDirection = 'asc') {
    const sorters: Record<BudgetOrderBy, (current: Budget, next: Budget) => number> = {
      date: (current, next) => current.createdAt.localeCompare(next.createdAt),
      name: (current, next) => current.name.localeCompare(next.name, 'es', { sensitivity: 'base' }),
      total: (current, next) => current.total - next.total,
    };

    const directionMultiplier = direction === 'asc' ? 1 : -1;

    this.budgetArray.sort((current, next) => sorters[orderBy](current, next) * directionMultiplier);
  }

  getBudgetById(id: string): Budget | null {

    const budget = this.budgetArray.find(budget => budget.createdAt === id);
    if (!budget) {
      return null;
    }
    return budget;
  }
}