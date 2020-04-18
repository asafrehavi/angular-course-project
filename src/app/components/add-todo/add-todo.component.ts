import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodosService } from 'src/app/services/todos.service';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonMethodsService } from 'src/app/services/common-methods.service';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit , OnDestroy {

  userId: number;
  canAdd: boolean;
  titleFormControl = new FormControl('', [Validators.required]);
  subscriptions: Subscription[] = [];
  constructor(private todosService: TodosService,
              private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute,
              private commonMethodsService: CommonMethodsService) {
   }
  ngOnDestroy(): void {
    this.subscriptions.forEach(singleSubscription => {
      singleSubscription.unsubscribe();
    });
  }
  getTitleErrorMessage() {
    if (this.titleFormControl.hasError('required')) {
      return 'You should enter todo title';
    }
    return '';
  }
  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe(params => {
      this.userId =  params.id;
    });
    this.subscriptions.push(routeSubscription);
    this.canAdd = false;
  }
  onAdd() {
    if (!this.titleFormControl.valid) {
          alert('Cannot add todo - The title is empty');
          return;
    }
    this.todosService.add(this.titleFormControl.value,
                         this.userId);
    const hasUnCompletedTask = this.todosService.hasUnCompletedTodos(this.userId);
    this.usersService.updateMarkComplete(this.userId, hasUnCompletedTask);
    this.commonMethodsService.backToFullUserPage(this.router, this.userId);
  }
  onCancel() {
    this.commonMethodsService.backToFullUserPage(this.router, this.userId);
  }
  updateCanAdd() {
    this.canAdd = this.titleFormControl.valid;
  }
}
