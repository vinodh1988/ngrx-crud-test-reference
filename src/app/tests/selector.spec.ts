
import * as fromReducer from '../ngrx/reducers/todo.reducer';
import * as fromSelectors from '../ngrx/selectors/todo.selectors';


describe('TodoSelectors', () => {
  const initialState: any = {
    todos: fromReducer.todoAdapter.setAll(
      [{ id: 1, title: 'Test', completed: false }],
      fromReducer.initialState
    )
  };

  it('should select all todo ids', () => {
    const result = fromSelectors.selectTodoById(1).projector(fromSelectors.selectAllTodos(initialState));
    expect(result).toEqual({ id: 1, title: 'Test', completed: false })  });



  it('should select all todos', () => {
    expect(fromSelectors.selectAllTodos(initialState)).toEqual([{ id: 1, title: 'Test', completed: false }]);
  });

  
});
