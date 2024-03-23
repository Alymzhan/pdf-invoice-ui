import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    // Handle form submission logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    this.router.navigate(['/invoice']);
  }

}
