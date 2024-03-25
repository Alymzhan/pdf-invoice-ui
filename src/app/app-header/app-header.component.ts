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
  username = 'Donald T.'
  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user?.name || '';
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
    this.router.navigate(['']);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
