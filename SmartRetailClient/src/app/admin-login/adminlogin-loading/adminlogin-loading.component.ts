import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin-loading',
  templateUrl: './adminlogin-loading.component.html',
  styleUrls: ['./adminlogin-loading.component.css']
})
export class AdminloginLoadingComponent {

  constructor(private router: Router) {}
  
    paymentTimeout = setTimeout(() => {
      this.loginSuccessful();
    }, 2000);
  
    loginSuccessful() {
      this.router.navigate(['/admin-dashboard']);
    }

}
