import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-payment-loading',
  templateUrl: './payment-loading.component.html',
  styleUrls: ['./payment-loading.component.css']
})
export class PaymentLoadingComponent {
 
    constructor(private router: Router) {}
 
    paymentSuccess:boolean = false;
 
    paymentTimeout = setTimeout(() => {
      this.paymentSuccessful();
    }, 5000);
 
    paymentSuccessful() {
      this.paymentSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/profile/orders']);
        this.paymentSuccess = false;
      }, 2000);
    }
}