import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../models/address.model';
import { PaymentService } from '../services/payment.service';
 
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
 
})
 
export class PaymentComponent {
  paymentSuccess: boolean = false;  // Controls the display of the success message
  processingPayment: boolean = false; // Controls the display of the processing message
  selectedOption: string = ''; // Stores the selected payment option
 
 address !: Address;
 totalAmount =0;



 isInvalid: boolean = false;
 isInvalidcvv : boolean = false;
 isInvalidexpiry : boolean = false;
 isInvalidcard : boolean = false;

  validateUpiId(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const pattern = /^\d{10}@.+$/;
    this.isInvalid = !pattern.test(input);
  }

  validateCard(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const pattern = /^\d{10}/;
    this.isInvalidcard = !pattern.test(input);
  }

  validateExpiry(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const pattern = /^\d{2}\/\d{2}$/;
    this.isInvalidexpiry = !pattern.test(input);
  }

  validateCVV(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    const pattern = /^\d{3}/;
    this.isInvalidcvv = !pattern.test(input);
  }

  constructor(private router: Router,private paymentservice : PaymentService) 
  {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as {
      address : Address
      totalAmount : number
    };
    this.address = state.address;
    this.totalAmount = state.totalAmount;
    //console.log(this.address);
  }
  // Initiates the payment process
  onPayNow(): void {

    const addressstring = `${this.address.street},${this.address.city},${this.address.state},${this.address.country},${this.address.zip}`;

    console.log("IN payment cs");
    if( this.isInvalid== false && 
      this.isInvalidcvv == false && 
      this.isInvalidexpiry == false && 
      this.isInvalidcard==false){
    this.paymentservice.addpayment(addressstring).subscribe(()=>
    {
      this.router.navigate(['/payment-loading']);
    //   this.showProcessingPayment(); // Show "Processing your Payment" pop-up for 3 seconds
 
    // this.delay(5000).then(() => {
    //   this.showPaymentSuccess(); // Show "Payment Successful" pop-up after 3 seconds
    // });
    })
  }

    
  }
 
  // Updates the selected payment option and displays relevant UI
  showTextBox(option: string): void {
    this.selectedOption = option;
  }
 
  // Displays the "Processing your Payment" message for a limited time
  showProcessingPayment(): void {
    this.processingPayment = true;
 
    // Hide the processing message after 3 seconds
    this.delay(3000).then(() => {
      this.processingPayment = false;
    });
  }
 
  // Displays the "Payment Successful" message for a limited time
  showPaymentSuccess(): void {
    this.paymentSuccess = true;
 
    // Hide the success message after 5 seconds
    this.delay(3000).then(() => {
      this.paymentSuccess = false;
      this.router.navigate(['/cart']); // router redirecting
    });
  }
 
  // Utility function to simulate delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}