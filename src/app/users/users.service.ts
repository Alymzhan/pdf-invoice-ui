import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Config, UserResponse, Users, UsersResponse } from '../models/user.model';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(id: number) {
    const url = `/api/users/?id=${id}&org=1`;
    return this.http
      .get<UsersResponse>(
        url
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          if (resData.status) {
            // console.log('response', resData);
          } 
        })
      );
  }

  addNewUser(name: string, userName: string, password: string, phone_number: string, config: Config) {
    const url = `/api/user/new`;
    return this.http
      .post<UserResponse>(
        url,
        {
            name: name,
            userName: userName,
            password: password,
            phone_number: phone_number,
            config: config,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            // console.log('response new user1', resData);
          if (resData.status) {
            // console.log('response new user2', resData);
          } 
        })
      );
  }

  editUser(user: Users) {
    const url = `/api/user/${user.ID}`;
    return this.http
      .put<UserResponse>(
        url,
        user
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
            // console.log('response new user1', resData);
          if (resData.status) {
            // console.log('response new user2', resData);
          } 
        })
      );
  }

  deleteUser(id: number) {
    const url = `/api/user/${id}`;
    return this.http
      .delete<UserResponse>(
        url
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          if (resData.status) {
            // console.log('response Delete user', resData);
          } 
        })
      );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Неизвестная ошибка. Обратитесь к Администратору';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    // switch (errorRes.error.error.message) {
    //   case 'EMAIL_EXISTS':
    //     errorMessage = 'Этот email уже существует';
    //     break;
    // }
    return throwError(errorMessage);
  }
}
