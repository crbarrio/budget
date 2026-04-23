import { Component, inject } from '@angular/core';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { ModalAlertData } from '../../../interfaces/modal.interface';
import { ModalService } from '../../../services/modal.service';


@Component({
  templateUrl: './alert.html',
})
export class Alert {
  data = inject<ModalAlertData>(DIALOG_DATA);
  modalService = inject(ModalService);

  message = this.data.message;
  variant = this.data.variant;
  title = this.data.title ?? '';

}
