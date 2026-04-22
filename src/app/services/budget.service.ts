import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget.interface';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {




  budgetsMock: Budget[] = [
    {
      id: 1,
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
    }
  ]

  async saveBudget(budget: Budget) {
    this.budgetsMock.push(budget)
  }

}
