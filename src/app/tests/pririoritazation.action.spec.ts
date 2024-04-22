import * as fromActions from '../ngrx/actions/priority.action';

describe('Prioritization Actions', () => {
  it('should create loadPriorities action', () => {
    const action = fromActions.loadPriorities();
    expect(action.type).toBe('[Prioritization] Load Priorities');
  });

  it('should create loadPrioritiesSuccess action with payload', () => {
    const payload = ['High', 'Medium', 'Low'];
    const action = fromActions.loadPrioritiesSuccess({ priorities: payload });
    expect(action.type).toBe('[Prioritization] Load Priorities Success');
    expect(action.priorities).toEqual(payload);
  });

  it('should create loadPrioritiesFailure action with error', () => {
    const error = { message: 'Error loading' };
    const action = fromActions.loadPrioritiesFailure({ error });
    expect(action.type).toBe('[Prioritization] Load Priorities Failure');
    expect(action.error).toEqual(error);
  });
});
