import { Component, input, output } from '@angular/core';
import { ServiceElement } from '../../../interfaces/service.interface';

@Component({
  selector: 'app-subservice-item',
  imports: [],
  templateUrl: './subservice-item.html',
  styleUrl: './subservice-item.css',
})
export class SubserviceItem {
  subservice = input.required<ServiceElement>();
  quantity = input.required<number>();
  quantityChanged = output<number>();

  changeQuantity(quantityChanged: number) {
    this.quantityChanged.emit(quantityChanged);
  }


}
