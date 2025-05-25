import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-loading',
  templateUrl: './login-loading.component.html',
  styleUrls: ['./login-loading.component.css']
})
export class LoginLoadingComponent {

  constructor(private router: Router) {}

  paymentTimeout = setTimeout(() => {
    this.loginSuccessful();
  }, 2000);

  loginSuccessful() {
    this.router.navigate(['']);
  }
}
