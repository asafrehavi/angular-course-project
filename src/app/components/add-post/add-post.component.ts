import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonMethodsService } from 'src/app/services/common-methods.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit ,  OnDestroy {

  userId: number;
  canAdd: boolean;
  bodyFormControl = new FormControl('', [Validators.required]);
  titleFormControl = new FormControl('', [Validators.required]);
  subscriptions: Subscription[] = [];
  constructor(private postService: PostsService,
              private route: ActivatedRoute,
              private router: Router,
              private commonMethodsService: CommonMethodsService) {
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(singleSubscription => {
      singleSubscription.unsubscribe();
    });
  }
  ngOnInit(): void {
    const routeSubscription = this.route.params.subscribe(params => {
      this.userId =  params.id;
    });
    this.subscriptions.push(routeSubscription);
    this.canAdd = false;
  }

  getBodyErrorMessage() {
    if (this.bodyFormControl.hasError('required')) {
      return 'You should enter post body';
    }
    return '';
  }
  getTitleErrorMessage() {
    if (this.titleFormControl.hasError('required')) {
      return 'You should enter post title';
    }
    return '';
  }
  onCancel() {
    this.commonMethodsService.backToFullUserPage(this.router, this.userId);
  }
  updateCanAdd() {
    this.canAdd = this.titleFormControl.valid && this.bodyFormControl.valid;
  }
  onAdd() {
    this.postService.add(this.userId,
                         this.titleFormControl.value,
                         this.bodyFormControl.value);
    this.commonMethodsService.backToFullUserPage(this.router, this.userId);
  }
}
