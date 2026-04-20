import { Component, input, output } from '@angular/core';
import type { ServiceElement } from "../../interfaces/service.interface";

@Component({
  selector: 'app-service-item',
  imports: [],
  templateUrl: './service-item.html',
})
export class ServiceItem {

  service = input.required<ServiceElement>();

  serviceToggled = output<{
    id: number,
    checked: boolean
  }>();

  onChangeService(event: Event) {
    const checkbox = event.target as HTMLInputElement

    this.serviceToggled.emit({
      id: this.service().id,
      checked: checkbox.checked,
    })
  }


}
