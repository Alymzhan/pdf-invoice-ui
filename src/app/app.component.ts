import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { User } from './auth/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  private userSub: Subscription;
  user: User | null;
  
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  title = 'pdf-invoice-ui';
}
