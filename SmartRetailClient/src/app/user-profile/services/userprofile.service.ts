import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Invoice } from 'src/app/models/invoice.model';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }


  updateprofile(customer : Customer)
  {

    this.http.put<any>(`${this.apiendpoint}/api/Auth/User/Profile`,customer).subscribe((response)=>console.log(response));
  }


  updatepassword(password : string)
  {
    
    const body = {password : password};
    console.log(body);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put<any>(`${this.apiendpoint}/api/Auth/User/Password`,body,{headers}).subscribe((response)=>console.log(response));
  }

  getorders() : Observable<Order[]>
  {
    return this.http.get<Order[]>(`${this.apiendpoint}/api/Orders`);
  }

  getinvoice(orderid : number) : Observable<Invoice>
  {
    return this.http.get<Invoice>(`${this.apiendpoint}/api/Invoice?orderid=${orderid}`);
  }

  getcustomer():Observable<Customer>
  {
    return this.http.get<Customer>(`${this.apiendpoint}/api/Auth/User/Details`);
  }

}
