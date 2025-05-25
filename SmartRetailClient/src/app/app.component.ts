import { Component } from '@angular/core';

declare var bootstrap: any; // Ensure you have Bootstrap JS imported

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Retail';
  isLoggedin:boolean = false;

  onLoginSuccess() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('loginModalLong'));
    if (modal) {
      modal.hide(); // Close the modal
    }
    this.isLoggedin = true;
  }

  placeholders: string[] = [
    "Search here...",
    "Find your favorite gaming console...",
    "Look for mobiles...",
    "Search laptops or tablets..."
  ];

  cur:number = 0;
  placeholder:string = this.placeholders[this.cur];

  constructor() {

    //Change placeholder every 3 seconds
    setInterval(() => {
      this.cur = (this.cur + 1) % this.placeholders.length;
      this.placeholder = this.placeholders[this.cur];
    }, 3000); 
  };
}
