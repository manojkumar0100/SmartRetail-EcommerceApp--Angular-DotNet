import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  apiendpoint = environment.apiendpoint;
  constructor(private http:HttpClient) { }

  getreviews(productid : number) : Observable<Review[]>
  {
    return this.http.get<Review[]>(`${this.apiendpoint}/api/Review?productid=${productid}`);
  }

  addproductreview(review : Review) 
  {
    return this.http.post<any>(`${this.apiendpoint}/api/Review`,review);
  }

  checkproductordered(productid : any):Observable<boolean>
  {
    return this.http.get<boolean>(`${this.apiendpoint}/api/Ordered?productid=${productid}`);
  }


}
