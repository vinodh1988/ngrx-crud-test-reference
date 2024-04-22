import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from '../todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpController.verify();
  });

  it('should retrieve all todos', () => {
    const mockTodos: Todo[] = [{ id: 1, title: 'Test Todo', completed: false }];

    service.getTodos().subscribe(todos => {
      expect(todos).toEqual(mockTodos);
    });

    const req = httpController.expectOne(service.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a todo', () => {
    const newTodo: Todo = { id: 1, title: 'New Todo', completed: false };

    service.addTodo(newTodo).subscribe({next: 
        (todo:Todo) => {
               expect(todo).toEqual(newTodo);
                }
    });

    const req = httpController.expectOne(service.apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(newTodo);
  });

  it('should update a todo', () => {
    const updatedTodo: Todo = { id: 1, title: 'Updated Todo', completed: true };

    service.updateTodo(updatedTodo).subscribe(todo=> {
      expect(todo).toEqual(updatedTodo);
    });

    const req = httpController.expectOne(`${service.apiUrl}/${updatedTodo.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedTodo);
    req.flush(updatedTodo);
  });

  it('should delete a todo', () => {
    const todoId = 1;

    service.deleteTodo(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpController.expectOne(`${service.apiUrl}/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
