import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from './services/product.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { NotifyService } from './services/notify.service';

@Component({
  
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  
  products: Product[] = [];
  totalProducts: number = 0;
  lowStockProducts: number = 0;
  highStockProducts: number = 0;
  outOfStockProducts: number = 0;

  private productSubscription: Subscription | null = null;

  constructor(private notifyservice : NotifyService,private productService: ProductService) {}

  ngOnInit(): void {
    //this.productService.getproducts().subscribe((products)=>{this.products = products;})
    this.calculateStatistics()
   
    this.notifyservice.notifyParent$.subscribe(() => {
      this.calculateStatistics();
    });
    
  }


  ngOnDestroy(): void {
    // if (this.productSubscription) {
    //   this.productSubscription.unsubscribe();
    // }
  }

  // Calculate statistics based on the products
  calculateStatistics(): void {
    this.productService.getproducts().subscribe((products)=>{
      this.products = products;console.log(this.products)
      this.totalProducts = this.products.length;
    
    this.lowStockProducts = this.products.filter(product => product.quantity <= 5).length;
    this.highStockProducts = this.products.filter(product => product.quantity >= 50).length;
    this.outOfStockProducts = this.products.filter(product => product.quantity === 0).length;
    })
    
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId);
      this.productService.getproducts().subscribe((products)=>{this.products = products}); // Refresh the list
    }
  }

  logout()
  {
    localStorage.removeItem("adminisLoggedin");
    localStorage.removeItem("adminauthToken");
  }

  


  
  // private productSubject: BehaviorSubject<Product[]> = new BehaviorSubject(this.products);
  //   getProductUpdates(): Observable<Product[]> {
      
  //   return this.productSubject.asObservable();
  // }
}
