import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent {
  
  userData : Customer =
  {
    firstName :'',
    lastName :'',
    email :'',
    password :'',
    phoneNumber : ''
  }

  constructor(private userprofile : UserprofileService){}


  ngOnInit() : void
  {
    this.userprofile.getcustomer().subscribe((customer)=>{
      this.userData = customer;
    })
  }

  onSave(): void {

    console.log("In OnSave");
    console.log(this.userData);
    this.userprofile.updateprofile(this.userData);
    console.log('User Data Saved:', this.userData);
  }
}
