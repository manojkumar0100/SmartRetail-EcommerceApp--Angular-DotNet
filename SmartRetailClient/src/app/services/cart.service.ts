import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { environment } from '../environment';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) 
  {
    
        
  }

  getcartproducts() : Observable<Cart[]>
  {
    return this.http.get<Cart[]>(`${this.apiendpoint}/api/Cart`)
  }


  addcartproduct(productid : number,quantity : number) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body ={"productID": productid,"quantity": quantity}
    return this.http.post<any>(`${this.apiendpoint}/api/Cart`,body);
    
  }

  deletecartproduct(cartid : number) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.apiendpoint}/api/Cart/Delete`,{body : cartid , headers : headers});
    // .subscribe(
    //   response =>
    //   {
    //     console.log("Product Deleted From Cart");
    //   },
    //   error =>
    //   {
    //     console.log(error);
    //   }
    // );
  }

  deleteallcartproduct() : any
  {
    
    return this.http.delete<any>(`${this.apiendpoint}/api/Cart/DeleteAll`);
    // .subscribe(
    //   response =>
    //   {
    //     console.log("Product Deleted From Cart");
    //   },
    //   error =>
    //   {
    //     console.log(error);
    //   }
    // );
  }

  incCartQty(cartid : number) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiendpoint}/api/Cart/Put/Inc`,cartid);
  }

  decCartQty(cartid : number) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiendpoint}/api/Cart/Put/Dec`,cartid );
  }
    
  
    ngOnInit() : void
    {
      
    }


}
