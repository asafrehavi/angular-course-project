import { Injectable, APP_INITIALIZER } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonMethodsService} from './common-methods.service';
import {Todo} from 'src/app/dataObjects/todo';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  private todos: Todo[] = [];
  private todosBs = new BehaviorSubject<Todo[]>(this.todos);
  todosOb = this.todosBs.asObservable();
  constructor(private http: HttpClient,
              private commonMethodService: CommonMethodsService) {
      this.initialize();
   }
  // Methods
  private initialize() {
    this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos/').toPromise()
    .then(this.performActionsOnDataUpdate());
    }
  private performActionsOnDataUpdate(): (value: Todo[]) => void | PromiseLike<void> {
    return data => {
      this.todos = data;
      this.todosBs.next(this.todos);
    };
  }

    hasUnCompletedTodos(userId: number) {
      const hasTodos = this.todos.some(singleTodo =>
         String(singleTodo.userId) === String(userId) &&
         singleTodo.completed === false);
      return hasTodos;
    }
    delete(userId: number) {
        const rowsToDelete = this.todos.filter(singleTodo => singleTodo.userId === userId);
        rowsToDelete.forEach(singleRowForDelete => this.commonMethodService.delete(singleRowForDelete.id, this.todos));
        this.todosBs.next(this.todos);
    }
    markComplete(id: number) {
        const todoForUpdate = this.todos.filter(singleTodo => singleTodo.id === id);
        if (todoForUpdate.length === 0) {
          console.log('cannot find todo with id ' + id);
          return;
        }
        todoForUpdate[0].completed = true;
        this.todosBs.next(this.todos);
    }
    add(title: string, userId: number) {
      const todosId = this.commonMethodService.getNextId(this.todos);
      let todo: any ;
      todo = new Todo(title, false, userId, todosId);
      this.todos.push(todo);
      this.todosBs.next(this.todos);
    }
    getUserTodos(userId: number) {
      let userTodos: Todo[];
      userTodos = this.todos.filter(singleItem => String(singleItem.userId) === String(userId));
      return userTodos;
    }
}
