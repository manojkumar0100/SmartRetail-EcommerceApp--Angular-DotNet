import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../models/wishlist.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }


  getwishlistproducts() : Observable<Wishlist[]>
  {
    return this.http.get<Wishlist[]>(`${this.apiendpoint}/api/Wishlist`);
  }

  addwishlistproduct(productid : any) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiendpoint}/api/Wishlist`,productid); 
  }

  deletwishlistproduct(productid : number) : any
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<any>(`${this.apiendpoint}/api/Wishlist`,{body : productid,headers : headers});
  }

  checkwishlistproduct(productid : number) : Observable<boolean>
  {
    return this.http.post<boolean>(`${this.apiendpoint}/api/Wishlist/Check`,productid);
  }


}
