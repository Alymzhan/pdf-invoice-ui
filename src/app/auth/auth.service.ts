import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from './user.model';
import { UserResponse, UsersResponse } from '../models/user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // user = new BehaviorSubject<User>(null);
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<UserResponse>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAvcex4MoXBfqHyFJWt7pDryvREfYg3v80',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.User.userName,
            resData.User.ID, 
            resData.User.name, 
            resData.User.phone_number, 
            resData.User.config, 
            resData.User.token
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<UserResponse>(
        '/api/user/login',
        {
          userName: email,
          password: password,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          if (resData.status) {
            console.log('response', resData);
            this.handleAuthentication(
                resData.User.userName,
                resData.User.ID, 
                resData.User.name, 
                resData.User.phone_number, 
                resData.User.config,
                resData.User.token
              );
          } 
        })
      );
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
    let userData: User;

    if (!userDataString) {
      return;
    } else {
      userData = JSON.parse(userDataString);
    }

    const loadedUser = new User(
      userData.userName,
      userData.id, 
      userData.name,  
      userData.phone_number, 
      userData.config,
      userData.token,
      userData.tokenExpirationDate
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    userName: string,
    id: number,
    name: string,
    phone_number: string,
    config: any,
    token: string,
    expiresIn: number = 86400
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); //86400sec == 24hr, or it will expire in one day
    const user = new User(userName, id, name, phone_number, config, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Неверный логин или пароль!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Этот email уже существует';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Неверный логин или пароль!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Неверный логин или пароль!';
        break;
    }
    return throwError(errorMessage);
  }
}
