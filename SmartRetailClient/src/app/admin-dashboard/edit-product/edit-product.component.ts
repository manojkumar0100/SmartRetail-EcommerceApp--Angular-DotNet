import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/models/product.model';
import { NotifyService } from '../services/notify.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  
  products: Product[] = [];
  categories : Category[]=[];
  selectedProduct: Product | null = null;
  successMessage: string | null = null;  // Success message after editing/deleting
  errorMessage: string | null = null;    // Error message for form validation


 
  constructor(private notifyservice : NotifyService,private productService: ProductService,private categoryservice : CategoryService) {}

  ngOnInit(): void {
    this.productService.getproducts().subscribe((products)=>{this.products = products});
    this.categoryservice.getcategories().subscribe((categories)=>{this.categories=categories})
  }

  

  editProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Create a copy of the product to edit
    this.successMessage = null;
    this.errorMessage = null;
    this.notifyservice.notifyParent();
  }



  updateProduct(): void {
    
    if (this.selectedProduct && this.selectedProduct.name && this.selectedProduct.price && this.selectedProduct.categoryID) {
      console.log(this.selectedProduct);
      this.productService.updateProduct(this.selectedProduct).subscribe((response)=>this.productService.getproducts().subscribe((products)=>{this.products = products;this.notifyservice.notifyParent();}))
      this.successMessage = 'Product updated successfully!';
      this.selectedProduct = null; // Clear the form after updating
      //this.productService.getproducts().subscribe((products)=>{this.products = products});
      setTimeout(() => this.successMessage = null, 3000); // Clear success message after 3 seconds
    } else {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => this.errorMessage = null, 3000); // Clear error message after 3 seconds
    }
    
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe((response)=>{this.productService.getproducts().subscribe((products)=>{this.products = products;this.notifyservice.notifyParent();});})
      // console.log(productId);
      // console.log("In TS");
      this.successMessage = 'Product deleted successfully!';
      //this.productService.getproducts().subscribe((products)=>{this.products = products});
      setTimeout(() => this.successMessage = null, 3000); // Clear success message after 3 seconds
    }
    
  }


  getcategory(categoryID : number) : string
  {
    return this.categories.find(category => category.categoryID === categoryID).name;

  }


}