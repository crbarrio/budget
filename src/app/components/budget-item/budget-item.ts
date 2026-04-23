import { DatePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Budget } from '../../interfaces/budget.interface';
import { ModalService } from '../../services/modal.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-budget-item',
  imports: [DatePipe, RouterLink],
  templateUrl: './budget-item.html'
})

export class BudgetItem {
  budget = input.required<Budget>();
  modalService = inject(ModalService);

}
