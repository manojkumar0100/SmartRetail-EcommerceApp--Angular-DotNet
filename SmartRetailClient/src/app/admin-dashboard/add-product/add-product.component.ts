import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from 'src/app/models/product.model';
import { NotifyService } from '../services/notify.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  
  product: Product = {
    productID: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    categoryID: 0,
    isInWishlist: false
  };


  categories : Category[]=[];


  successMessage: string | null = null; // Variable to show success message

  constructor(private router:Router,private notifyservice :NotifyService,private productService: ProductService,private categoryservice : CategoryService) {}

  ngOnInit() : void
  {
    this.categoryservice.getcategories().subscribe((categories)=>{this.categories = categories});
  }

  imagefile !:File;

  onFileChange(event: any) {
    this.imagefile = event.target.files[0];
  }

  addProduct(): void {
    //this.product.productID = Math.random().toString(36).substr(2, 9); // Generate random ID
    // console.log(this.product);
    // console.log("In Ts");

    const newproduct =
    {
      name: this.product.name,
    description: this.product.description,
    price: this.product.price,
    quantity: this.product.quantity,
    
    categoryID: this.product.categoryID
    }


    this.productService.addProduct(newproduct,this.imagefile).subscribe((response)=>{
      console.log(response);
      this.notifyservice.notifyParent();
      this.successMessage = 'Product added successfully!';
      
    })

    // Display success message
    

    // Reset form and hide message after 3 seconds
    this.resetForm();
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
    
  }

  resetForm(): void {
    // this.product = {
    //   productID: 0,
    //   name: '',
    //   description: '',
    //   price: 0,
    //   quantity: 0,
    //   imageUrl: '',
    //   categoryID: 0,
    //   isInWishlist : false
    // };
  }
}