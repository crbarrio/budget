import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { BudgetService } from '../../services/budget.service';
import { Card } from "../../components/shared/card/card";
import { HeroHeader } from "../../components/hero-header/hero-header";
import { budgetDetailsPageText } from '../../text/text';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget-details',
  imports: [RouterLink, Card, HeroHeader, DatePipe],
  templateUrl: './budget-details.html',
})
export default class BudgetDetails {

  readonly budgetDetailsPageText = budgetDetailsPageText;

  heroHeaderText = this.budgetDetailsPageText.header;
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
