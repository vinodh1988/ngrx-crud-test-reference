import * as fromTodoActions from '../ngrx/actions/todoactions';

describe('Todo Actions', () => {
  it('should create an action to load todos', () => {
    expect(fromTodoActions.loadTodos().type).toBe('[Todo] Load Todos');
  });

  it('should create an action to load todos success', () => {
    const payload = { todos: [{ id: 1, title: 'Test Todo', completed: false }] };
    const action = fromTodoActions.loadTodosSuccess(payload);
    expect(action.type).toBe('[Todo] Load Todos Success');
    expect(action.todos).toEqual(payload.todos);
  });

  it('should create an action to add a todo', () => {
    const todo = { id: 2, title: 'New Todo', completed: false };
    const action = fromTodoActions.addTodo({ todo });
    expect(action.type).toBe('[Todo] Add Todo');
    expect(action.todo).toEqual(todo);
  });

  it('should create an action to update a todo', () => {
    const todo = { id: 2, title: 'Updated Todo', completed: true };
    const action = fromTodoActions.updateTodo({ todo });
    expect(action.type).toBe('[Todo] Update Todo');
    expect(action.todo).toEqual(todo);
  });

  it('should create an action to delete a todo', () => {
    const id = 2;
    const action = fromTodoActions.deleteTodo({ id });
    expect(action.type).toBe('[Todo] Delete Todo');
    expect(action.id).toEqual(id);
  });
});
