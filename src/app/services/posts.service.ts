import { Injectable } from '@angular/core';
import {CommonMethodsService} from './common-methods.service';
import {HttpClient} from '@angular/common/http';
import {Post} from 'src/app/dataObjects/post';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];
  private postsBs = new BehaviorSubject<Post[]>(this.posts);
  postsOb = this.postsBs.asObservable();
  constructor(private http: HttpClient,
              private commonMethodService: CommonMethodsService) {
                this.initliaze();
            }
 initliaze() {
  this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts/').toPromise()
      .then(this.performActionsOnDataUpdate());
  }
  private performActionsOnDataUpdate(): (value: Post[]) => void | PromiseLike<void> {
    return data => {
      this.posts = data;
      this.postsBs.next(this.posts);
    };
  }
  delete(userId: number) {
    const rowsToDelete = this.posts.filter(singleTodo => singleTodo.userId === userId);
    rowsToDelete.forEach(singleRowForDelete => this.commonMethodService.delete(singleRowForDelete.id, this.posts));
    this.postsBs.next(this.posts);
  }

  add(userId: number, title: string, body: string) {
    const postId = this.commonMethodService.getNextId(this.posts);
    const post = new Post(title, body, userId, postId);
    this.posts.push(post);
    this.postsBs.next(this.posts);
  }
  getUserPosts(userId: number) {
    let userPosts: Post[];
    userPosts = this.posts.filter(singleItem => String(singleItem.userId) === String(userId));
    return userPosts;
  }
}

