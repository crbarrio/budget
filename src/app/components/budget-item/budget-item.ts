import { Component, input } from '@angular/core';
import { Budget } from '../../interfaces/budget.interface';

@Component({
  selector: 'app-budget-item',
  imports: [],
  templateUrl: './budget-item.html',
  styleUrl: './budget-item.css',
})

export class BudgetItem {
  budget = input.required<Budget>();
}
