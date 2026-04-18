import { Component } from '@angular/core';
import { Card } from "../../components/shared/card/card";
import { ServiceItem } from "../../components/service-item/service-item";
import { HeroHeader } from '../../components/hero-header/hero-header';
import { BudgetForm } from "../../components/budget-form/budget-form";
import { BudgetItem } from '../../components/budget-item/budget-item';

import dbData from '../../../data/db.json';
import type { ServiceElement } from "../../interfaces/service.interface";
import { Budget } from '../../interfaces/budget.interface';

const budgetsMock: Budget[] = [
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

@Component({
  selector: 'app-home',
  imports: [Card, ServiceItem, HeroHeader, BudgetForm, BudgetItem],
  templateUrl: './home.html',
})
export default class Home {
  services: ServiceElement[] = dbData.services;
  budgets: Budget[] = budgetsMock;
}
