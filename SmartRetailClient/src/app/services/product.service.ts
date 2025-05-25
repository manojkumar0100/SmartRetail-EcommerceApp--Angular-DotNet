import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiendpoint = environment.apiendpoint;
  constructor(private http : HttpClient) {}

  getproducts() : Observable<Product[]>
  {
    return this.http.get<Product[]>(`${this.apiendpoint}/api/Product`)
  }
  ngOnInit() : void{ }

  // ###########################
  // Observable to notify changes
  // private productSubject: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);

  // getProducts(): Product[] {
  //   return this.products;
  // }

  // getProductUpdates(): Observable<Product[]> {
  //   return this.productSubject.asObservable();
  // }

  addProduct(product: Product): void {
    // this.products.push({ ...product, id: (this.products.length + 1).toString() });
    // this.productSubject.next(this.products); // Notify subscribers about the product update
  }

  updateProduct(updatedProduct: Product): void {
    // const index = this.products.findIndex(p => p.id === updatedProduct.id);
    // if (index !== -1) {
    //   this.products[index] = updatedProduct;
    //   this.productSubject.next(this.products); // Notify subscribers about the product update
    // }
  }

  deleteProduct(productId: string): void {
    // this.products = this.products.filter(product => product.id !== productId);
    // this.productSubject.next(this.products); // Notify subscribers about the deletion
  }
}


// ##########################################################################
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Product } from './product.model'; // Import the Product model

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private products: Product[] = [
//     { id: '1', name: 'Smartphone X', price: 799, category: 'Electronics', stock: 10, image: 'assets/images/smartphone.jpeg', description: 'A high-end smartphone' },
//     { id: '2', name: 'Laptop Pro', price: 1299, category: 'Electronics', stock: 5, image: 'assets/images/laptop.jpeg', description: 'A professional laptop' },
//     { id: '3', name: 'Wireless Earbuds', price: 199, category: 'Audio', stock: 15, image: 'assets/images/earbuds.jpeg', description: 'A high-end product' },
//     { id: '4', name: 'Smart Watch', price: 299, category: 'Wearables', stock: 7, image: 'assets/images/smartwatch.jpeg', description: 'A professional smartbuds' },
//     // Other sample products
//   ];

//   // Observable to notify changes
//   private productSubject: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);

//   constructor() {}

//   getProducts(): Product[] {
//     return this.products;
//   }

//   getProductUpdates(): Observable<Product[]> {
//     return this.productSubject.asObservable();
//   }

//   addProduct(product: Product): void {
//     this.products.push({ ...product, id: (this.products.length + 1).toString() });
//     this.productSubject.next(this.products); // Notify subscribers about the product update
//   }

//   updateProduct(updatedProduct: Product): void {
//     const index = this.products.findIndex(p => p.id === updatedProduct.id);
//     if (index !== -1) {
//       this.products[index] = updatedProduct;
//       this.productSubject.next(this.products); // Notify subscribers about the product update
//     }
//   }

//   deleteProduct(productId: string): void {
//     this.products = this.products.filter(product => product.id !== productId);
//     this.productSubject.next(this.products); // Notify subscribers about the deletion
//   }
// }