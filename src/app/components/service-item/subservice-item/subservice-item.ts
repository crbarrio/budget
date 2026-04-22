import { Component, inject, input, output } from '@angular/core';
import { ServiceElement } from '../../../interfaces/service.interface';
import { ModalService } from '../../../services/modal.service';

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
  infoRequested = output<{ id: number; name: string }>();
  modalService = inject(ModalService);

  changeQuantity(quantityChanged: number) {
    this.quantityChanged.emit(quantityChanged);
  }

}
