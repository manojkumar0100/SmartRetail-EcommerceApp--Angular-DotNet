import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/models/product.model';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent {
  products: Product[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private notifyservice:NotifyService,private productService: ProductService) {
    this.productService.getproducts().subscribe((products)=>{this.products = products});
  }
 

  updateStock(product: Product, stockInput: any): void {
    
    // Check if the input is valid before updating
    if (stockInput.valid) {
      console.log(product);
      this.productService.updateProduct(product).subscribe(response => this.productService.getproducts().subscribe((products)=>{this.products = products;this.notifyservice.notifyParent();}))
    
      this.successMessage = 'Stock updated successfully!';
      this.errorMessage = null;
      setTimeout(() => this.successMessage = null, 3000); // Hide success message after 3 seconds
    } else {
      this.errorMessage = 'Please provide a valid stock quantity.';
      setTimeout(() => this.errorMessage = null, 3000); // Hide error message after 3 seconds
    }
    
  }
}
