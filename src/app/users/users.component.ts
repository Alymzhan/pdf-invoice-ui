import {Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Users } from '../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { User } from '../auth/user.model';
import { UsersService } from './users.service';
import { DeleteUserConfirmationDialogComponent } from '../delete-user-confirmation-dialog/delete-user-confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
 })
export class UsersComponent implements OnInit, OnDestroy{

  usersData: Users[] = [];
  subscription: Subscription;
  userSub: Subscription;
  user: User | null;
  error: string = '';

  constructor(private authService: AuthService, private usersService: UsersService, private dialog: MatDialog, private snackBar: MatSnackBar) {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.refreshUsersData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSub.unsubscribe();
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      // Обработка результата после закрытия диалогового окна
      if (updatedUser) {
        // Добавление нового пользователя в список пользователей или выполнение других действий
        this.userSub = this.usersService.editUser(updatedUser).subscribe(
          resData => {
            if (resData.status) {
              // console.log(resData);
              // Показать сообщение об успехе
              this.snackBar.open('Пользователь успешно изменен', 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              // Обновление данных пользователей после добавления нового пользователя
              this.refreshUsersData();
            } else {
              // console.log(resData.message);
              this.error = this.handleErrorMessage(resData.message);
              // Показать сообщение об ошибке
              this.snackBar.open(this.error, 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            }
          },
          errorMessage => {
            // console.log(errorMessage);
            this.error = errorMessage;
            // Показать сообщение об ошибке
            this.snackBar.open(this.error, 'Закрыть', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        );
      }
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px', // Установите ширину по вашему усмотрению
      disableClose: true, // Предотвращение закрытия диалогового окна при клике вне его области
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Обработка результата после закрытия диалогового окна
      if (result) {
        // Добавление нового пользователя в список пользователей или выполнение других действий
        // console.log('Новый пользователь добавлен:', result);
        this.userSub = this.usersService.addNewUser(result.name, result.userName, result.password, result.phone_number, result.config).subscribe(
          resData => {
            if (resData.status) {
              // console.log(resData);
              // Показать сообщение об успехе
              this.snackBar.open('Новый пользователь успешно добавлен', 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              // Обновление данных пользователей после добавления нового пользователя
              this.refreshUsersData();
            } else {
              // console.log(resData.message);
              this.error = this.handleErrorMessage(resData.message);
              // Показать сообщение об ошибке
              this.snackBar.open(this.error, 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            }
          },
          errorMessage => {
            // console.log(errorMessage);
            this.error = errorMessage;
            // Показать сообщение об ошибке
            this.snackBar.open(this.error, 'Закрыть', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        );
      }
    });
  }
  

  private refreshUsersData(): void {
    this.subscription = this.usersService.getUsers(this.user ? this.user.id: 0).subscribe(users => {
      this.usersData = users.Users;
    });
  }

  private handleErrorMessage(errorRes: string) {
    let errorMessage = 'Неизвестная ошибка. Обратитесь к Администратору';
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

  deleteUser(user: any): void {
    const dialogRef = this.dialog.open(DeleteUserConfirmationDialogComponent, {
      width: '300px',
      data: user,
    });
  
    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        // console.log('Удаление пользователя:', user);
        
        this.usersService.deleteUser(user.ID).subscribe(
          resData => {
            if (resData.status) {
              // console.log('Пользователь успешно удален:', user);
              // Показать сообщение об успехе
              this.snackBar.open('Пользователь успешно удален', 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
              // Обновить данные пользователей в таблице
              this.refreshUsersData();
            } else {
              // console.log('Не удалось удалить пользователя:', user);
              // Показать сообщение об ошибке
              this.snackBar.open('Не удалось удалить пользователя', 'Закрыть', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
              });
            }
          },
          error => {
            // console.log('Ошибка удаления пользователя:', error);
            // Показать сообщение об ошибке
            this.snackBar.open('Ошибка удаления пользователя', 'Закрыть', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        );
      }
    });
  }
}  