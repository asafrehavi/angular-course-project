import { Component, OnInit, Output , EventEmitter, OnDestroy } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User} from 'src/app/dataObjects/user';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit , OnDestroy {
  constructor(private userService: UsersService,
              private router: Router ) { }
    public filteredUsers: User[] = [];
    public allUsers: User[] = [];
    subscriptions: Subscription[] = [];
    searchText;
    ngOnInit() {
      const usersObSubscription = this.userService.usersOb.subscribe(data => {
        this.allUsers = data;
        this.filteredUsers = this.allUsers.slice();
        this.onKeyUp();
      });
      this.subscriptions.push(usersObSubscription);
    }
    ngOnDestroy(): void {
      this.subscriptions.forEach(singleSubscription => {
        singleSubscription.unsubscribe();
      });
    }
    onKeyUp() {
      if (this.searchText === undefined || this.searchText === '') {
        this.filteredUsers = this.allUsers.slice();
        return;
      }
      this.filteredUsers = this.allUsers.filter(singleUser => singleUser.isMatchToSearch(this.searchText));
    }
    onAdd() {
      this.router.navigate([{outlets: {primary: 'home', mainpage1: 'adduser', mainpage2: 'blank'}}]);
    }
}
