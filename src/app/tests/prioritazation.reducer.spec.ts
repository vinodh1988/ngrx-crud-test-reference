import { reducer, initialState, State as PrioritizationState } from '../ngrx/reducers/priority.reducer';
import * as fromActions from '../ngrx/actions/priority.action';

describe('PrioritizationReducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = reducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should load priorities and set loaded to true on success', () => {
    const priorities = ['High', 'Medium', 'Low'];
    const action = fromActions.loadPrioritiesSuccess({ priorities });
    const state = reducer(initialState, action);
    expect(state.priorities).toEqual(priorities);
    expect(state.loaded).toBe(true);
  });

  it('should store an error and set loaded to false on failure', () => {
    const error = { message: 'Error loading' };
    const action = fromActions.loadPrioritiesFailure({ error });
    const state = reducer(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.loaded).toBe(false);
  });
});
