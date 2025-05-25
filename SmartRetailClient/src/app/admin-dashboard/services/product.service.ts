import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  apiendpoint = environment.apiendpoint;


  constructor(private http:HttpClient) { }

  getproducts() : Observable<Product[]>
    {
      return this.http.get<Product[]>(`${this.apiendpoint}/api/Product`)
    }
    ngOnInit() : void{ }


    addProduct(product: any,file : File) {
      //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      //const body = { product : product};

      const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
     console.log(product);
     console.log(file);
    // console.log("In Service");
      return this.http.post<any>(`${this.apiendpoint}/api/Admin`,formData);
      // this.products.push({ ...product, id: (this.products.length + 1).toString() });
      // this.productSubject.next(this.products); // Notify subscribers about the product update
    }

    updateProduct(updatedProduct: Product){
      
      console.log(updatedProduct);
      return this.http.put<any>(`${this.apiendpoint}/api/Admin`,updatedProduct);
      // const index = this.products.findIndex(p => p.id === updatedProduct.id);
      // if (index !== -1) {
      //   this.products[index] = updatedProduct;
      //   this.productSubject.next(this.products); // Notify subscribers about the product update
      // }
    }


    deleteProduct(productId: number) {
       const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      //  console.log(productId);
      // console.log("In TS");
      return this.http.delete<any>(`${this.apiendpoint}/api/Admin`,{body : productId , headers : headers});
      // this.products = this.products.filter(product => product.id !== productId);
      // this.productSubject.next(this.products); // Notify subscribers about the deletion
    }


    


    
  
    // ###########################
    // Observable to notify changes
    
  
    
 
   
  
   
}
