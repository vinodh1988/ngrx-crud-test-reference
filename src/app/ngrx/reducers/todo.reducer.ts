// todo.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Todo } from '../../models/todo.model';
import * as TodoActions from '../actions/todoactions';

export interface TodoState extends EntityState<Todo> {}

export const todoAdapter = createEntityAdapter<Todo>();

export const initialState: TodoState = todoAdapter.getInitialState();

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodosSuccess, (state, { todos }) => todoAdapter.setAll(todos, state)),
  on(TodoActions.addTodoSuccess, (state, { todo }) => todoAdapter.addOne(todo, state)),
  on(TodoActions.updateTodoSuccess, (state, { todo }) => todoAdapter.updateOne({ id: todo.id, changes: todo }, state)),
  on(TodoActions.deleteTodoSuccess, (state, { id }) => todoAdapter.removeOne(id, state))
);
