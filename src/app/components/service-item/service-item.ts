import { Component, input, output } from '@angular/core';
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
  checked = input(false);
  subserviceQuantities = input<Record<number, number | undefined>>({});

  serviceToggled = output<{ id: number; checked: boolean }>();
  subserviceQuantityChanged = output<{
    serviceId: number;
    subserviceId: number;
    change: number;
  }>();

  onChangeService(event: Event) {
    const checkbox = event.target as HTMLInputElement;

    this.serviceToggled.emit({
      id: this.service().id,
      checked: checkbox.checked,
    });
  }

  updateSubservice(subserviceId: number, change: number) {
    if (this.checked()) {
      this.subserviceQuantityChanged.emit({
        serviceId: this.service().id,
        subserviceId,
        change,
      });
    }
  }

}
