import { BrowserModule } from '@angular/platform-browser';
import { NgModule,  CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { AppComponent } from './app.component';
import {MaterialModule} from './Material';
import {HttpClientModule} from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserComponent } from './components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoComponent } from './components/todo/todo.component';
import { TodosComponent } from './components/todos/todos.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';
import { ErrorComponent } from './components/error/error.component';


const appRoutes: Routes =  [
  { path : '' , component : UsersComponent},
  { path: '', component: BlankComponent, outlet: 'mainpage1' },
  { path: '', component: BlankComponent, outlet: 'mainpage2' },
  { path : 'home' , component : UsersComponent},
  { path: 'home', component: TodosComponent, outlet: 'mainpage1' },
  { path: 'home', component: PostsComponent, outlet: 'mainpage2' },
  { path: 'adduser', component: AddUserComponent, outlet: 'mainpage1' },
  { path: 'adduser', component: BlankComponent, outlet: 'mainpage2' },
  { path: 'blank', component: BlankComponent, outlet: 'mainpage2' },
  { path: 'todos', component: TodosComponent , outlet: 'mainpage1' },
  { path: 'addtodo', component: AddTodoComponent, outlet: 'mainpage1' },
  { path: 'posts', component: PostsComponent, outlet: 'mainpage2' },
  { path: 'addpost', component: AddPostComponent, outlet: 'mainpage2' },
  { path : '**', component: ErrorComponent },
    ];

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    MainComponent,
    UserComponent,
    TodoComponent,
    TodosComponent,
    PostsComponent,
    PostComponent,
    AddUserComponent,
    AddPostComponent,
    AddTodoComponent,
    BlankComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
