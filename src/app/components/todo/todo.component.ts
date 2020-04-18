import { Component, OnInit, Input } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import {Todo} from 'src/app/dataObjects/todo';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  constructor(private todosService: TodosService,
              private usersService: UsersService) { }
  ngOnInit(): void {
  }
  onMarkComplete() {
    this.todosService.markComplete(this.todo.id);
    const hasUnCompletedTask = this.todosService.hasUnCompletedTodos(this.todo.userId);
    this.usersService.updateMarkComplete(this.todo.userId, hasUnCompletedTask);
  }

}
