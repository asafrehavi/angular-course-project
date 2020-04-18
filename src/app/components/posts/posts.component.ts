import { Component, OnInit, OnDestroy } from '@angular/core';
import {PostsService} from 'src/app/services/posts.service';
import {Post} from 'src/app/dataObjects/post';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit , OnDestroy {
  posts: Post[];
  subscriptions: Subscription[] = [];

  userId: number;
  constructor(private postService: PostsService,
              private route: ActivatedRoute,
              private router: Router) {
   }
  ngOnDestroy(): void {
    this.subscriptions.forEach(singleSubscription => {
      singleSubscription.unsubscribe();
    });
  }

    ngOnInit() {
      const postSubscription = this.postService.postsOb.subscribe(data => {
        this.posts = this.postService.getUserPosts(this.userId);
        this.subscriptions.push(postSubscription);
      });
      const routeSubscription = this.route.params.subscribe(async params => {
      this.userId =  params.id;
      this.posts = this.postService.getUserPosts(this.userId);
      this.subscriptions.push(routeSubscription);
    });
  }

  onAdd() {
    this.router.navigate([{outlets: {primary: 'home',
     mainpage1: ['todos', {id: this.userId}],
     mainpage2: ['addpost', {id: this.userId}]}}]);
  }
}
