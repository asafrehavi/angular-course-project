import { Component, OnInit, OnDestroy } from '@angular/core';
import {TodosService} from 'src/app/services/todos.service';
import {Todo} from 'src/app/dataObjects/todo';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit , OnDestroy {
  todos: Todo[] = [];
  userId: number;
  subscriptions: Subscription[] = [];
  constructor(private todosService: TodosService,
              private router: Router,
              private route: ActivatedRoute) {
   }
  ngOnDestroy(): void {
    this.subscriptions.forEach(singleSubscription => {
      singleSubscription.unsubscribe();
    });
  }
  ngOnInit() {
    const todosSubscription = this.todosService.todosOb.subscribe(data => {
      this.todos = this.todosService.getUserTodos(this.userId);
    });
    this.subscriptions.push(todosSubscription);
    const routeSubscription = this.route.params.subscribe(params => {
        this.userId =  params.id;
        this.todos = this.todosService.getUserTodos(this.userId);
      });
    this.subscriptions.push(routeSubscription);
    }
    onAdd() {
      this.router.navigate([{outlets: {primary: 'home',
      mainpage1: ['addtodo', {id: this.userId}],
      mainpage2: ['posts', {id: this.userId}]}}]);
    }
  }
