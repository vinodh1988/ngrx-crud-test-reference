import * as fromSelectors from '../ngrx/selectors/prioritization.selectors';
import { State as PrioritizationState } from '../ngrx/reducers/priority.reducer';

describe('Prioritization Selectors', () => {
  const initialState: PrioritizationState = {
    priorities: ['High', 'Medium', 'Low'],
    loaded: true,
    error: null
  };

  it('should select the priorities', () => {
    const result = fromSelectors.selectPriorities.projector(initialState);
    expect(result).toEqual(['High', 'Medium', 'Low']);
  });

 
});
