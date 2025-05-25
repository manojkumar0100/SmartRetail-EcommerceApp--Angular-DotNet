import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  isLoggedin = localStorage.getItem("isLoggedin") === 'true';
  username:string = '';

  activeSection: string = 'details';  // Default to 'My Details' section
  
  userData = {
    firstName: 'Mateusz',
    secondName: 'Wierzbicki',
    birthDate: '',
    phoneNumber: '123456789',
    email: 'email@example.pl'
  };

  constructor() {}

  ngOnInit(): void {this.username = localStorage.getItem("username") || "Guest";}

  onSave(): void {
    // Handle form submission
    console.log('User Data:', this.userData);
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("username");
    this.isLoggedin = false;
  }


}