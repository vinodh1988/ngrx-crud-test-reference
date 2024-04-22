import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { PrioritizationEffects } from '../ngrx/effects/priority.effect';
import * as fromActions from '../ngrx/actions/priority.action';
import { Action } from '@ngrx/store';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PrioritizationEffects', () => {
  let effects: PrioritizationEffects;
  let actions$: Observable<Action>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PrioritizationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PrioritizationEffects);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return a loadPrioritiesSuccess action, with the priorities, when loadPriorities succeeds', done => {
    const priorities = ['High', 'Medium', 'Low'];
    actions$ = of(fromActions.loadPriorities());

    effects.loadPriorities$.subscribe(action => {
      expect(action).toEqual(fromActions.loadPrioritiesSuccess({ priorities }));
      done();
    });

    //const req = httpTestingController.expectOne('your-api-url');
    //req.flush(priorities);
  });

 


});
