import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalData } from '../../../interfaces/modal.interface';
import { ModalService } from '../../../services/modal.service';




@Component({
  selector: 'app-modal',
  templateUrl: './modal.html',
})
export class Modal {
  data = inject<ModalData>(DIALOG_DATA);
  modalService = inject(ModalService);

  message = this.data.message;
  variant = this.data.variant;
  title = this.data.title ?? '';

}
