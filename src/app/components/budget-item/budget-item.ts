import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Budget } from '../../interfaces/budget.interface';
import { ModalService } from '../../services/modal.service';
import { servicesPageText } from '../../text/text';

@Component({
  selector: 'app-budget-item',
  imports: [DatePipe],
  templateUrl: './budget-item.html'
})

export class BudgetItem {
  readonly servicesPageText = servicesPageText;
  budget = input.required<Budget | null>();
  modalService = inject(ModalService);

}
