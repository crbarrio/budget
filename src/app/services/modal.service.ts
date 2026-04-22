import { inject, Injectable } from '@angular/core';
import { Modal } from '../components/shared/modal/modal';
import { ModalData } from '../interfaces/modal.interface';
import { Dialog } from '@angular/cdk/dialog';

@Injectable({
  providedIn: 'root',
})

export class ModalService {

  private dialog = inject(Dialog);

  openModal(data: ModalData) {
    return this.dialog.open(Modal, {
      data
    });
  }

  closeModal() {
    this.dialog.closeAll();
  }
}
