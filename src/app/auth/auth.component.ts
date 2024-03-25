import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { UserResponse } from '../models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {

    this.error = null;
    if (!form.valid) {
    return;
    }
    const userName = form.value.userName;
    const password = form.value.password;

    let authObs: Observable<UserResponse>;

    this.isLoading = true;

    authObs = this.authService.login(userName, password);

    authObs.subscribe(
      resData => {
        if (resData.status) {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/invoice']);
        } else {
          console.log(resData.message);
          this.error = this.handleErrorMessage(resData.message);
          this.isLoading = false;
        }
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  private handleErrorMessage(errorRes: string) {

    console.log('here', errorRes);
    let errorMessage = 'Неверный логин или пароль!';
    if (!errorRes) {
      return errorMessage;
    }
    switch (errorRes) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Этот email уже существует';
        break;
      case 'Invalid login credentials. Please try again':
        errorMessage = 'Неверный логин или пароль!';
        break;
      case 'User Name address not found':
        errorMessage = 'Неверный логин или пароль!';
        break;
    }
    return errorMessage;
  }
}
