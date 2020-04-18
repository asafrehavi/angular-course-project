import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodosService} from './todos.service';
import {PostsService} from './posts.service';
import {CommonMethodsService} from './common-methods.service';
import { User } from '../dataObjects/user';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class UsersService  {

  private allUsers: User[] = [];
  private usersBs = new BehaviorSubject<User[]>(this.allUsers);
  usersOb = this.usersBs.asObservable();
  private selectedUserId: number;
  private selectedUserBs = new BehaviorSubject<number>(undefined);
  selectedUserOb = this.selectedUserBs.asObservable();
   constructor(private http: HttpClient,
               private todosService: TodosService,
               private commonMethodService: CommonMethodsService,
               private postsService: PostsService) {
                this.getAllUsers();
               }
   getAllUsers() {
     this.http.get('https://jsonplaceholder.typicode.com/USERS').toPromise()
     .then(this.performActionsOnDataUpdate());
   }
   private performActionsOnDataUpdate(): (value: User[]) => void | PromiseLike<void> {
    return data => {
      this.convertUsers(data);
      this.usersBs.next(this.allUsers);
    };
  }
   convertUsers(users) {
    users.forEach(userJson => {
      const user = new User(userJson.name,
                            userJson.id,
                            userJson.email,
                            userJson.address.street,
                            userJson.address.city,
                            userJson.address.zipcode);
      this.allUsers.push(user);
    });
    this.setUsersData();
  }
   // public methods
   updateMarkComplete(userId: number, hasUnCompletedTask: boolean) {
    const usersForUpdate = this.allUsers.filter(singleUser => String(singleUser.id) === String(userId));
    if (usersForUpdate.length === 0) {
      console.log('cannot find user with id ' + userId);
      return;
    }
    usersForUpdate[0].hasTodos = hasUnCompletedTask;
    this.usersBs.next(this.allUsers);
   }
   add(name: string , email: string) {
     const nextId = this.commonMethodService.getNextId(this.allUsers);
     const newUser = new User(name, nextId, email, '', '', '');
     newUser.id = nextId;
     newUser.name = name;
     newUser.email = email;
     newUser.hasTodos = false;
     this.allUsers.push(newUser);
     this.usersBs.next(this.allUsers);
     this.changeSelectedUserId(nextId);
     return nextId;
   }
   delete(id: number) {
    this.commonMethodService.delete(id, this.allUsers);
    this.todosService.delete(id);
    this.postsService.delete(id);
    this.usersBs.next(this.allUsers);
  }
  update(user: User) {
    const usersForUpdate = this.allUsers.filter(singleUser => singleUser.id === user.id);
    if (usersForUpdate.length === 0) {
      console.log('cannot find user with id ' + user.id);
      return;
    }
    usersForUpdate[0].email = user.email;
    usersForUpdate[0].name = user.name;
    usersForUpdate[0].city = user.city;
    usersForUpdate[0].street = user.street;
    usersForUpdate[0].zipCode = user.zipCode;
    this.usersBs.next(this.allUsers);
  }

  changeSelectedUserId(userId) {
      this.selectedUserId = userId;
      this.selectedUserBs.next(userId);
  }
  // Private methods
  private  setUsersData() {
    this.allUsers.forEach(singleUser =>  {
      const hasUnCompletedTodos =  this.todosService.hasUnCompletedTodos(singleUser.id);
      singleUser.hasTodos = hasUnCompletedTodos;
    });
   }
  }
