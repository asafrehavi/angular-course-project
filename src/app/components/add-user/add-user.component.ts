import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonMethodsService } from 'src/app/services/common-methods.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  canAdd: boolean;
  constructor(private usersService: UsersService,
              private commonMethodsService: CommonMethodsService,
              private router: Router) { }
  ngOnInit(): void {
    this.canAdd = false;
  }
  getNameErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You should enter user name';
    }

    return this.emailFormControl.hasError('minLength') ? 'The name shouldbe more than one character' : '';
  }
  getMailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter email';
    }

    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }
  onCancel() {
    this.router.navigate(['/']);
  }
  updateCanAdd() {
    this.canAdd = this.emailFormControl.valid  && this.nameFormControl.valid;
  }
  onAdd() {
    const newUserId = this.usersService.add(this.nameFormControl.value, this.emailFormControl.value);
    this.commonMethodsService.backToFullUserPage(this.router, newUserId);
  }
}
