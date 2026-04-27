import { Component, inject, signal, viewChild } from '@angular/core';
import { Card } from "../../components/shared/card/card";
import { ServiceItem } from "../../components/service-item/service-item";
import { BudgetForm } from "../../components/budget-form/budget-form";
import { BudgetItem } from '../../components/budget-item/budget-item';

import { Budget, BudgetOrderBy, BudgetOrderDirection } from '../../interfaces/budget.interface';

import { SelectedService } from '../../interfaces/service.interface';
import { BudgetService } from '../../services/budget.service';
import { modalAlertContent as modalCatalog, services, servicesPageText } from '../../text/text';
import { ModalService } from '../../services/modal.service';
import { HeroHeader } from "../../components/hero-header/hero-header";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [Card, ServiceItem, BudgetForm, BudgetItem, HeroHeader, RouterLink],
  templateUrl: './services.html',
})
export default class Services {
  readonly services = services;
  readonly modalAlertContent = modalCatalog;
  readonly servicesPageText = servicesPageText; 
  budgetService = inject(BudgetService);
  readonly defaultBudgetOrderDirections: Record<BudgetOrderBy, BudgetOrderDirection> = {
    date: 'desc',
    name: 'asc',
    total: 'desc',
  };
  currentBudgetOrderBy: BudgetOrderBy = 'date';
  currentBudgetOrderDirection: BudgetOrderDirection = 'desc';

  heroHeaderText = servicesPageText.budgetformHeader;

  budgetsListOrderOptions: { value: BudgetOrderBy; label: string }[] = [
    { value: 'date', label: 'Fecha' },
    { value: 'name', label: 'Nombre' },
    { value: 'total', label: 'Importe' },
  ];
  
  budgetForm = viewChild(BudgetForm);
  selectedServices: SelectedService[] = [];
  modalService = inject(ModalService);

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

  toggleService(serviceChange: { id: number; checked: boolean }) {
    const currentSelection = this.selectedServices.find((service) => service.id === serviceChange.id);

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
            quantity: currentSelection?.subservices?.find(item => item.id === sub.id)?.quantity ?? 1,
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

  updateSubserviceQuantity(serviceChange: { serviceId: number; subserviceId: number; change: number }) {
    this.selectedServices = this.selectedServices.map((service) => {
      if (service.id !== serviceChange.serviceId) {
        return service;
      }

      return {
        ...service,
        subservices: service.subservices?.map((subservice) => {
          if (subservice.id !== serviceChange.subserviceId) {
            return subservice;
          }

          return {
            ...subservice,
            quantity: Math.max(1, subservice.quantity + serviceChange.change),
          };
        }),
      };
    });

    this.recalculateTotal();
  }

  isServiceSelected(serviceId: number) {
    return this.selectedServices.some((service) => service.id === serviceId);
  }

  getSubserviceQuantities(serviceId: number) {
    const selectedService = this.selectedServices.find((service) => service.id === serviceId);

    if (!selectedService?.subservices) {
      return {};
    }

    return Object.fromEntries(
      selectedService.subservices.map((subservice) => [subservice.id, subservice.quantity])
    );
  }

  orderBudgets(orderBy: BudgetOrderBy) {
    const direction = this.currentBudgetOrderBy === orderBy
      ? this.getNextBudgetOrderDirection(this.currentBudgetOrderDirection)
      : this.defaultBudgetOrderDirections[orderBy];

    this.currentBudgetOrderBy = orderBy;
    this.currentBudgetOrderDirection = direction;
    this.budgetService.setOrderBy(orderBy, direction);
  }

  getBudgetOrderDirectionLabel(orderBy: BudgetOrderBy) {
    if (this.currentBudgetOrderBy !== orderBy) {
      return '';
    }
    // Material Icons: 'arrow_upward' for asc, 'arrow_downward' for desc
    return this.currentBudgetOrderDirection === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  isActiveOrder(orderBy: BudgetOrderBy) {
    return this.currentBudgetOrderBy === orderBy;
  }

  private getNextBudgetOrderDirection(direction: BudgetOrderDirection): BudgetOrderDirection {
    return direction === 'asc' ? 'desc' : 'asc';
  }

  private resetBudgetBuilder() {
    this.selectedServices = [];
    this.recalculateTotal();
    this.budgetForm()?.onReset();
  }

  async buildBudget(formData: { name: string; telephone: string; email: string }) {

    if (this.selectedServices.length === 0) {
      this.modalService.openAlertModal(this.modalAlertContent.noServicesSelected);
      return;
    }

    const budget: Budget = {
      createdAt: new Date().toISOString(),
      ...formData,
      services: this.selectedServices.map((selected) => {
        const service = this.services.find((item) => item.id === selected.id)!;

        return {
          id: service.id,
          name: service.name,
          description: service.description,
          price: service.price,
          quantity: service.initialQuantity,
          subservices: service.subservices?.map((sub) => ({
            id: sub.id,
            name: sub.name,
            description: sub.description,
            price: sub.price,
            quantity:
              selected.subservices?.find((item) => item.id === sub.id)?.quantity ?? 1,
          })),
        };
      }),
      total: this.total()
    };

    try {
      await this.budgetService.saveBudget(budget);
      
      this.modalService.openAlertModal(this.modalAlertContent.budgetSavedSuccess);
      this.resetBudgetBuilder();
    } catch (error) {

      this.modalService.openAlertModal(this.modalAlertContent.budgetSavedError);
      console.error(error);
    }
  }
}
