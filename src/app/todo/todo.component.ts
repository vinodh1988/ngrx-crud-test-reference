// todo.component.ts
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as TodoActions from '../ngrx/actions/todoactions';
import { selectAllTodos } from '../ngrx/selectors/todo.selectors';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos$: Observable<Todo[]>;
  newTodoTitle: string = '';

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.todos$ = this.store.pipe(select(selectAllTodos));
  }

  ngOnInit() {
    this.store.dispatch(TodoActions.loadTodos());
  }

  addTodo() {
    if (this.newTodoTitle.trim() === '') {
      return; // Don't add empty todo
    }
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000), // Generate a random id (for demo purposes)
      title: this.newTodoTitle,
      completed: false
    };
    this.store.dispatch(TodoActions.addTodo({ todo: newTodo }));
    this.newTodoTitle = ''; // Clear input after adding
  }

  updateTodoStatus(todo: Todo) {
    const updatedTodo: Todo = { ...todo, completed: !todo.completed };
    this.store.dispatch(TodoActions.updateTodo({ todo: updatedTodo }));
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoActions.deleteTodo({ id }));
  }
}
