import { Component, input, signal } from '@angular/core';
import type { ServiceElement } from "../../interfaces/service.interface";

@Component({
  selector: 'app-service-item',
  imports: [],
  templateUrl: './service-item.html',
})
export class ServiceItem {
  service = input.required<ServiceElement>();
}
