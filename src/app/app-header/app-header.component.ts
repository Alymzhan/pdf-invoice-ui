import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.css'
})
export class AppHeaderComponent {
  username = 'Donald T.'

  constructor(private router: Router) { }


  logout(): void {
    this.router.navigate(['']);
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
    this.router.navigate(['']);
  }

  reports(): void {
    //to do
    this.router.navigate(['']);
  }

}
