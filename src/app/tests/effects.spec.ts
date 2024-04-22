import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import {TodoEffects} from '../ngrx/effects/todoeffects'
import * as TodoActions from '../ngrx/actions/todoactions';
import { TodoService } from '../todo.service';
import { Action } from '@ngrx/store';

describe('TodoEffects', () => {
  let effects: TodoEffects;
  let actions$: Observable<Action>;
  let todoService: jest.Mocked<TodoService>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions$),
        {
          provide: TodoService,
          useValue: {
            getTodos: jest.fn(),
            addTodo: jest.fn(),
            updateTodo: jest.fn(),
            deleteTodo: jest.fn()
          }
        }
      ]
    });

    effects = TestBed.inject(TodoEffects);
    todoService = TestBed.inject(TodoService) as any;
  });

  describe('loadTodos$', () => {
    it('should return a LoadTodosSuccess action, with the todos, on success', () => {
      const todos = [{ id: 1, title: 'Test Todo', completed: false }];
      const action = TodoActions.loadTodos();
      const outcome = TodoActions.loadTodosSuccess({ todos });

      actions$ = of(action);
      todoService.getTodos.mockReturnValue(of(todos));

      effects.loadTodos$.subscribe(result => {
        expect(result).toEqual(outcome);
        expect(todoService.getTodos).toHaveBeenCalled();
      });
    });

    it('should return an AddTodoSuccess action, with the added todo, on success', () => {
        const todo = { id: 2, title: 'New Todo', completed: false };
        const action = TodoActions.addTodo({ todo });
        const outcome = TodoActions.addTodoSuccess({ todo });

        actions$ = of(action);
        todoService.addTodo.mockReturnValue(of(todo)); // Assuming add method returns Observable of added Todo

        effects.addTodo$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(todoService.addTodo).toHaveBeenCalledWith(todo);
        });
    });

    it('should return an UpdateTodoSuccess action, with the updated todo, on success', () => {
        const todo = { id: 1, title: 'Updated Todo', completed: true };
        const action = TodoActions.updateTodo({ todo });
        const outcome = TodoActions.updateTodoSuccess({ todo });

        actions$ = of(action);
        todoService.updateTodo.mockReturnValue(of(todo)); // Assuming update method returns Observable of updated Todo

        effects.updateTodo$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(todoService.updateTodo).toHaveBeenCalledWith(todo);
        });
    });

    it('should return a DeleteTodoSuccess action, with the id of the deleted todo, on success', () => {
        const id = 2;
        const action = TodoActions.deleteTodo({ id });
        const outcome = TodoActions.deleteTodoSuccess({ id });

        actions$ = of(action);
       // todoService.deleteTodo.mockReturnValue(void); // Assuming delete method returns Observable of deleted Todo ID

        effects.deleteTodo$.subscribe(result => {
            expect(result).toEqual(outcome);
            expect(todoService.deleteTodo).toHaveBeenCalledWith(id);
        });
    });

  /*  it('should return a LoadTodosFail action, on failure', () => {
      const action = TodoActions.loadTodos();
      const error = new Error('Unexpected Error');
      const outcome = TodoActions.loadTodosFail({ error });

      actions$ = of(action);
      todoService.getAll.mockReturnValue(throwError(() => error));

      effects.loadTodos$.subscribe(result => {
        expect(result).toEqual(outcome);
        expect(todoService.getAll).toHaveBeenCalled();
      });
    });*/
  });
});
