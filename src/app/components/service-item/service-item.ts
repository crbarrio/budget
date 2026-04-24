import { Component, input, output, signal } from '@angular/core';
import type { ServiceElement } from "../../interfaces/service.interface";
import { SubserviceItem } from "./subservice-item/subservice-item";

import { servicesPageText } from '../../text/text';

@Component({
  selector: 'app-service-item',
  imports: [SubserviceItem],
  templateUrl: './service-item.html',
})
export class ServiceItem {

  readonly servicesPageText = servicesPageText;
  service = input.required<ServiceElement>();
  isSelected = signal(false);
  subserviceQuantities: Record<number, number | undefined> = {};

  serviceToggled = output<{
    id: number,
    checked: boolean,
    subservices: {
      id: number,
      quantity: number
    }[]
  }>();

  onChangeService(event: Event) {
    const checkbox = event.target as HTMLInputElement

    this.isSelected.set(checkbox.checked);

    this.serviceToggled.emit({
      id: this.service().id,
      checked: checkbox.checked,
      subservices: this.service().subservices?.map(sub => ({
        id: sub.id,
        quantity: this.subserviceQuantities[sub.id] ?? 1
      })) || []

    })
  }

  updateSubservice(subserviceId: number, change: number) {
    const current = this.subserviceQuantities[subserviceId] ?? 1;
    this.subserviceQuantities[subserviceId] = Math.max(1, current + change);

    if (this.isSelected()) {
      this.serviceToggled.emit({
        id: this.service().id,
        checked: true,
        subservices: this.service().subservices?.map(subservice => ({
          id: subservice.id,
          quantity: subservice.id === subserviceId ? this.subserviceQuantities[subservice.id] ?? 1 : (this.subserviceQuantities[subservice.id] ?? 1)
        })) || []
      });
    }

  }

}
