import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget.interface';
import { ServiceElement } from '../interfaces/service.interface';


@Injectable({
  providedIn: 'root',
})
export class BudgetService {

  services: ServiceElement[] = [
    {
      id: 1,
      name: "Seo",
      description: "Optimización de motores de búsqueda para mejorar la visibilidad en línea",
      price: 300
    },
    {
      id: 2,
      name: "Ads",
      description: "Publicidad en línea para aumentar la visibilidad y las conversiones",
      price: 400
    },
    {
      id: 3,
      name: "Web",
      description: "Desarrollo de sitios web completos y responsivos ",
      price: 500,
      subservices: [
        {
          id: 1,
          name: "Páginas",
          description: "Número de páginas",
          price: 30
        },
        {
          id: 2,
          name: "Idiomas",
          description: "Número de idiomas",
          price: 30
        }
      ]
    }
  ]


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
