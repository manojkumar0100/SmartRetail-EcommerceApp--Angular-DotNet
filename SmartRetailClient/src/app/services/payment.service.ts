import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }


  addpayment(address : string) : Observable<any>
  {
    console.log("In payment service");
    const body = {address : address};
    return this.http.post<any>(`${this.apiendpoint}/api/Purchase?address=${address}`, {
      headers: { 'Content-Type': 'application/json' }
  });
}

}
