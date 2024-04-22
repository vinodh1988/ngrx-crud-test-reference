import { todoReducer, initialState } from '../ngrx/reducers/todo.reducer';
import * as fromTodoActions from '../ngrx/actions/todoactions';

describe('TodoReducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    expect(todoReducer(undefined, action)).toEqual(initialState);
  });

  it('should add a todo on addTodo action', () => {
    const todo = { id: 1, title: 'New Todo', completed: false };
    const action = fromTodoActions.addTodoSuccess({ todo });
    const state = todoReducer(initialState, action);
    console.log(state.entities)
    expect(state.entities['1']).toEqual(todo);
  });

  it('should update a todo on updateTodo action', () => {
    const initialTodo = { id: 1, title: 'Initial Todo', completed: false };
    const updatedTodo = { id: 1, title: 'Updated Todo', completed: true };
    const addAction = fromTodoActions.addTodoSuccess({ todo: initialTodo });
    const updateAction = fromTodoActions.updateTodoSuccess({ todo: updatedTodo });
    const stateAfterAdd = todoReducer(initialState, addAction);
    const updatedState = todoReducer(stateAfterAdd, updateAction);
    expect(updatedState.entities[1]).toEqual(updatedTodo);
  });

  it('should remove a todo on deleteTodo action', () => {
    const todo = { id: 1, title: 'Delete Me', completed: false };
    const addAction = fromTodoActions.addTodo({ todo });
    const deleteAction = fromTodoActions.deleteTodo({ id: todo.id });
    const stateAfterAdd = todoReducer(initialState, addAction);
    const updatedState = todoReducer(stateAfterAdd, deleteAction);
    expect(updatedState.entities[todo.id]).toBeUndefined();
  });
});
