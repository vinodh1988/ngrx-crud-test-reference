// todo.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TodoService } from '../../todo.service';
import * as TodoActions from '../actions/todoactions';

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private todoService: TodoService) {}

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map(todos => TodoActions.loadTodosSuccess({ todos })),
          catchError(() => of({ type: 'Load Todos Error' }))
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      mergeMap(({ todo }) =>
        this.todoService.addTodo(todo).pipe(
          map(addedTodo => TodoActions.addTodoSuccess({ todo: addedTodo })),
          catchError(() => of({ type: 'Add Todo Error' }))
        )
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap(({ todo }) =>
        this.todoService.updateTodo(todo).pipe(
          map(updatedTodo => TodoActions.updateTodoSuccess({ todo: updatedTodo })),
          catchError(() => of({ type: 'Update Todo Error' }))
        )
      )
    )
  );

  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.deleteTodo),
      mergeMap(({ id }) =>
        this.todoService.deleteTodo(id).pipe(
          map(() => TodoActions.deleteTodoSuccess({ id })),
          catchError(() => of({ type: 'Delete Todo Error' }))
        )
      )
    )
  );
}
