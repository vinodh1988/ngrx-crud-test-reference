import { Component } from '@angular/core';
import * as fromPrioritization from '../ngrx/reducers/priority.reducer'
import * as PrioritizationSelectors from '../ngrx/selectors/prioritization.selectors'
import * as PrioritizationActions from '../ngrx/actions/priority.action'
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-prioritization',
  templateUrl: './prioritization.component.html',
  styleUrl: './prioritization.component.css'
  
})
export class PrioritizationComponent {
  priorities$: Observable<string[]>;

  constructor(private store: Store<fromPrioritization.State>) {
    this.priorities$ = this.store.pipe(select(PrioritizationSelectors.selectPriorities));
    
  }

  ngOnInit(): void {
    this.store.dispatch(PrioritizationActions.loadPriorities());
  }
}
