import { BootstrapOptions, Component, signal, viewChild } from '@angular/core';
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

  selectedServices: {
    id: number;
    price: number;
    subservices?: {
      id: number;
      quantity: number;
      price: number;
    }[];
  }[] = [];

  total = signal<number>(0);

  recalculateTotal() {
    this.total.set(this.selectedServices.reduce((sum, service) => {
      let serviceTotal = service.price;

      if (service.subservices) {
        serviceTotal += service.subservices.reduce((subSum, sub) => {
          return subSum + (sub.price * (sub.quantity ?? 1));
        }, 0);
      }

      return sum + serviceTotal;
    }, 0))
  }

  toggleService(serviceChange: { id: number; checked: boolean; subservices: { id: number; quantity: number }[] }) {

    if (serviceChange.checked) {
      const service = this.services.find(service => service.id === serviceChange.id);

      if (service) {
        this.selectedServices = this.selectedServices.filter(
          service => service.id !== serviceChange.id
        );

        this.selectedServices.push({
          id: service.id,
          price: service.price,
          subservices: service.subservices?.map(sub => ({
            id: sub.id,
            quantity: serviceChange.subservices.find(s => s.id === sub.id)?.quantity ?? 1,
            price: sub.price
          }))
        });
      }

    } else {
      this.selectedServices = this.selectedServices.filter(
        service => service.id !== serviceChange.id
      );
    }

    this.recalculateTotal();
  }

}
