import { Component, inject, signal } from '@angular/core';

import { Card } from "../../components/shared/card/card";
import { ServiceItem } from "../../components/service-item/service-item";
import { HeroHeader } from '../../components/hero-header/hero-header';
import { BudgetForm } from "../../components/budget-form/budget-form";
import { BudgetItem } from '../../components/budget-item/budget-item';

import { Budget } from '../../interfaces/budget.interface';

import { SelectedService } from '../../interfaces/service.interface';
import { BudgetService } from '../../services/budget.service';
import { modalContent as modalCatalog, services } from '../../text/text';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-home',
  imports: [Card, ServiceItem, HeroHeader, BudgetForm, BudgetItem],
  templateUrl: './home.html',
})

export default class Home {
  readonly services = services;
  readonly modalContent = modalCatalog;
  budgetService = inject(BudgetService);
  modalService = inject(ModalService);

  selectedServices: SelectedService[] = [];
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
    }, 0));
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

  buildBudget(formData: { name: string; telephone: string; email: string }) {
    const budget: Budget = {
      id: Date.now(),
      ...formData,
      services: this.selectedServices.map((selected) => {
        const service = this.services.find((item) => item.id === selected.id)!;

        return {
          id: service.id,
          name: service.name,
          price: service.price,
          subservices: service.subservices?.map((sub) => ({
            id: sub.id,
            name: sub.name,
            price: sub.price,
            quantity:
              selected.subservices?.find((item) => item.id === sub.id)?.quantity ?? 1,
          })),
        };
      }),
    };

    this.budgetService.saveBudget(budget);
    this.selectedServices = [];
    this.recalculateTotal();
    this.modalService.openModal(this.modalContent.budgetSavedSuccess);
  }
}
