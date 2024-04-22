import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent implements OnInit, OnDestroy{
  username = 'Неизвестный пользователь'
  isAuthenticated = false;
  isAdmin = false;
  private userSub: Subscription;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      if (user) {
        this.username = user.name;
        this.isAdmin = user.isAdmin;
      }
    });
  }


  logout(): void {
    this.authService.logout();
  }

  invoice(): void {
    this.router.navigate(['/invoice']);
  }

  users(): void {
    //to do
    this.router.navigate(['/users']);
  }

  settings(): void {
    //to do
    this.router.navigate(['/table']);
  }

  reports(): void {
    //to do
    this.router.navigate(['/reports']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
