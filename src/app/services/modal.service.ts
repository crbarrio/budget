import { inject, Injectable } from '@angular/core';
import { Alert } from '../components/shared/alert/alert';
import { ModalAlertData } from '../interfaces/modal.interface';
import { Dialog } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})

export class ModalService {

  private dialog = inject(Dialog);

  openAlertModal(data: ModalAlertData) {
    return this.dialog.open(Alert, {
      data
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
