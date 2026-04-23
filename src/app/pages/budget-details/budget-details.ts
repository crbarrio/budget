import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { BudgetItem } from "../../components/budget-item/budget-item";
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-budget-details',
  imports: [BudgetItem, RouterLink],
  templateUrl: './budget-details.html',
})
export default class BudgetDetails {


  budgetService = inject(BudgetService);

  budgetId = toSignal<string>(
    inject(ActivatedRoute).params.pipe(
      map(params => params['budgetId'])
    )
  )

  budget = computed(() => {
    const id = this.budgetId();
    return id ? this.budgetService.getBudgetById(id) : null;
  });

}
