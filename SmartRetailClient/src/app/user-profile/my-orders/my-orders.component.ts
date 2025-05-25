import { Component } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders : Order[]=[];

  constructor(private userprofileservice : UserprofileService){}

  ngOnInit()
  {
    

     this.userprofileservice.getorders().subscribe((orders)=>
      {
        console.log(orders);
        this.orders = orders;
        console.log(this.orders);
      });
     
  }


}
