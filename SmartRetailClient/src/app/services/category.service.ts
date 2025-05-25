import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../environment';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  

  apiendpoint = environment.apiendpoint;

  constructor(private http : HttpClient) 
  {
    
   }

   getcategories() : Observable<Category[]> 
   {
    return this.http.get<Category[]>(`${this.apiendpoint}/api/Category`);
    
   }

   ngOnInit() : void
  {
    
  }
}
