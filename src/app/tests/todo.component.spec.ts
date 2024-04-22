import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store, StoreModule } from '@ngrx/store';

import * as TodoActions from '../ngrx/actions/todoactions';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TodoComponent } from '../todo/todo.component';
import { selectAllTodos } from '../ngrx/selectors/todo.selectors';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let store: MockStore;
  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoComponent ],
      imports: [ FormsModule, StoreModule.forRoot({}) ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    store.overrideSelector(selectAllTodos, []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadTodos on init', () => {
    const action = TodoActions.loadTodos();
    const spy = jest.spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(action);
  });

  it('should add new todo when addTodo is called', () => {
    const todoTitle = 'Test Todo';
    component.newTodoTitle = todoTitle;
    
    
    const spy = jest.spyOn(store, 'dispatch');
    component.addTodo();
    
    expect(spy).toHaveBeenCalled();
    expect(component.newTodoTitle).toBe(''); 
  });

  it('should not add a todo when input is empty', () => {
    component.newTodoTitle = '';
    const spy = jest.spyOn(store, 'dispatch');
    component.addTodo();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should dispatch updateTodoStatus when a todo checkbox is changed', () => {
    const todo = { id: 1, title: 'Test Todo', completed: false };
    const spy = jest.spyOn(store, 'dispatch');
    component.updateTodoStatus(todo);
    expect(spy).toHaveBeenCalledWith(TodoActions.updateTodo({ todo: { ...todo, completed: true } }));
  });

  it('should dispatch deleteTodo when delete button is clicked', () => {
    const id = 1;
    const spy = jest.spyOn(store, 'dispatch');
    component.deleteTodo(id);
    expect(spy).toHaveBeenCalledWith(TodoActions.deleteTodo({ id }));
  });
});
