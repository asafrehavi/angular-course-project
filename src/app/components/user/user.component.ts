import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { User } from 'src/app/dataObjects/user';
import { CommonMethodsService } from 'src/app/services/common-methods.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit , OnDestroy {
  @Input() user: User ;
  shouldShowOtherData: boolean;
  selectedUserId: number = undefined;
  subscriptions: Subscription[] = [];
  constructor(private userService: UsersService,
              private router: Router,
              private commonMethodsService: CommonMethodsService) { }
  ngOnDestroy(): void {
    this.subscriptions.forEach(singleSubscription => {
      singleSubscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    const selectedUserSubscription = this.userService.selectedUserOb.subscribe(serviceUserId => {
      this.selectedUserId = serviceUserId;
     });
    this.subscriptions.push(selectedUserSubscription);
    }
  onDelete() {
    this.userService.delete(this.user.id);
    this.commonMethodsService.backToPartialUserPage(this.router);
  }
  onUpdate() {
    this.userService.update(this.user);
  }
  onIdClick() {
    this.userService.changeSelectedUserId(this.user.id);
    this.router.navigate([{outlets: {primary: 'home',
     mainpage1: ['todos', {id: this.user.id}],
     mainpage2: ['posts', {id: this.user.id}]}}]);
  }
  getClassName() {
    const isCurrentUserSelected = String(this.user.id) === String(this.selectedUserId);
    if (this.user.hasTodos && !isCurrentUserSelected) {
      return 'actionShouldComplete';
    }
    if (this.user.hasTodos && isCurrentUserSelected) {
      return 'selectedActionShouldComplete';
    }
    if (!this.user.hasTodos &&  isCurrentUserSelected) {
      return 'selectedActionCompleted';
    }
    return 'actionCompleted';
  }
}
