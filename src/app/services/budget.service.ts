import { Injectable } from '@angular/core';
import { Budget, BudgetOrderBy, BudgetOrderDirection } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  budgetsMock: Budget[] = [
    {
      id: new Date(),
      name: "Carlos Ramirez",
      email: "carlos.ramirez@example.com",
      telephone: "+34 123 123 123",
      services: [
        {
          id: 1,
          price: 300,
          name: "Web",
          subservices: [
            {
              id: 1,
              quantity: 2,
              price: 30,
              name: "Páginas",
            },
            {
              id: 2,
              quantity: 1,
              price: 30,
              name: "Idiomas",
            }
          ]
        },
        {
          id: 2,
          price: 200,
          name: "Seo",
        },
      ],
      total: 560
    }
  ]

  async saveBudget(budget: Budget): Promise<void> {
    await new Promise((resolve, reject) => {
      setTimeout(() => {

        const shouldFail = Math.random() < 0.3;

        if (shouldFail) {
          reject(new Error('Error al guardar el presupuesto. Inténtalo de nuevo.'));
          return;
        }

        this.budgetsMock.push(budget)
        resolve(true);
      }, 1000);
    });
  }

  setOrderBy(orderBy: BudgetOrderBy, direction: BudgetOrderDirection = 'asc') {
    const sorters: Record<BudgetOrderBy, (current: Budget, next: Budget) => number> = {
      date: (current, next) => current.id.getTime() - next.id.getTime(),
      name: (current, next) => current.name.localeCompare(next.name, 'es', { sensitivity: 'base' }),
      total: (current, next) => current.total - next.total,
    };

    const directionMultiplier = direction === 'asc' ? 1 : -1;

    this.budgetsMock.sort((current, next) => sorters[orderBy](current, next) * directionMultiplier);
  }
}