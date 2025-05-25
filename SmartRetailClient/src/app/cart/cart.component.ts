import { Component } from '@angular/core';

import { Product } from '../models/product.model'; // Adjust the path as necessary
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { filter, Observable,map, switchMap, combineLatest } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Category } from '../models/category.model';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

 categories : Category[]=[];

 filteredCategories: Category[] = [];
 filteredProducts : Product[]=[];
//  cartfilteredProducts : Product[]=[];

  products : Product[]=[];
  
  product : Product = {
    productID: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryID: 0,
    imageUrl: '',
    isInWishlist: false
  }

  cartItems  : Cart[]=[]; 

  isLoggedin:boolean = false;
  username :string | null | undefined;
  curYear:number = (new Date()).getFullYear();
 

  ngOnInit() {

    this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
    if(this.isLoggedin == true)
      this.username = localStorage.getItem('username');
  }

  cartItemslength !:number;
  
      constructor(private router: Router,private cartservice : CartService,private productservice : ProductService,private categoryservice : CategoryService)
      {
  
        this.productservice.getproducts().subscribe((products)=> {
          this.products = products;
          console.log(this.filteredProducts)
          
          
      });

        this.getcartproducts();        
      
      }


      getcartproducts()
      {
        this.cartservice.getcartproducts().pipe(
          switchMap(cartproducts => {
              this.cartItems = cartproducts;
              this.filterCategories();
              return this.productservice.getproducts();
          }),
          map(products => {
            console.log(this.filteredProducts)
              return products.filter(product => 
                  !this.cartItems.some(cartItem => cartItem.productID === product.productID)
              );
          })
      ).subscribe(filteredProducts => {
          this.filteredProducts = filteredProducts;
          console.log('Filtered Products:', this.filteredProducts);
      });

        this.cartItemslength = this.cartItems?.length;
        
      }



      categoryIds :number[]=[]

      filterCategories()
      {
        this.categoryservice.getcategories().subscribe((categories) => {
          this.categories = categories;

          // Filter categories to match cartItem categoryID
          this.filteredCategories = this.categories.filter(category =>
              this.cartItems.some(cartItem => cartItem.categoryID === category.categoryID)  
          );
          
          this.filteredProducts = this.products.filter(product => 
            !this.cartItems.some(cartItem => cartItem.productID === product.productID && product.categoryID==cartItem.categoryID)
        );
        
      });
      }

      filterByCategory(categoryID: number): void {
       
        if (categoryID == 0) {
          this.filteredProducts = this.products.filter(product => 
            !this.cartItems.some(cartItem => cartItem.productID === product.productID && product.categoryID==cartItem.categoryID)
        );
        } 
        else {
          this.filteredProducts = this.products.filter(product => 
            !this.cartItems.some(cartItem => cartItem.productID === product.productID && product.categoryID==cartItem.categoryID)
        );
          this.filteredProducts = this.filteredProducts.filter(product => product.categoryID === categoryID)
        }
      }
     
  

      getProduct(productID: number ): Product 
      {
        return this.products.find(product => product.productID === productID) || this.product;
      }

  
      totalMRP =0;

      getTotalMRP() {
        this.totalMRP = this.cartItems.reduce((total, item) => {
          const product = this.products.find(p => p.productID === item.productID);
          return total + (product?.price || 0) * (item.productQuantity || 0);
        }, 0);
        return this.totalMRP;
      }

  
  getTotalAmount() : number {
    
    return this.getTotalMRP() + (this.getTotalMRP() * 0.15) + (this.getTotalMRP() ? (this.getTotalMRP()>=1000 ? 25 : 70) : 0);
  }

 
  incrementQuantity(cartid: number) {
    this.cartservice.incCartQty(cartid).subscribe(()=>{
      const item = this.cartItems.find(item => item.cartID === cartid);
    if (item && item.productQuantity !== undefined) {
      item.productQuantity++;
      this.getTotalAmount(); 
    }
  }
    )
  }

  decrementQuantity(cartid: number) {
    this.cartservice.decCartQty(cartid).subscribe(()=>{
      const item = this.cartItems.find(item => item.cartID === cartid);
    if (item && item.productQuantity !== undefined) {
      item.productQuantity--;
      this.getTotalAmount(); 
    }

  }

    )
  }

  removeProduct(cartid: number) {
    this.cartservice.deletecartproduct(cartid).subscribe(()=>
    {
      this.cartItems = this.cartItems.filter(item => item.cartID !== cartid);

      this.filterCategories();

    });
    this.getTotalAmount(); 
    this.cartItemslength--;
    
    
    
  }

  clearcart()
  {
    this.cartservice.deleteallcartproduct().subscribe(()=>{
      this.cartItems = [];
    })
    this.getTotalAmount(); 
    this.cartItemslength=0;
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("name");
    this.isLoggedin = false;
    //this.clearcart();
  }

  // Add to Cart
  addToCart(product: Product) {
    
    this.cartservice.addcartproduct(product.productID,1).subscribe(()=>
    {
      //this.cartItems.filter((cartitem)=>{cartitem.productID !=product.productID});
      this.filteredProducts=this.filteredProducts.filter((products)=>products.productID!=product.productID);
      
      this.filterCategories()
      this.getcartproducts()
      console.log(product.productID);
    })
    
  }
  

  toggleDescription(item: Cart, event: Event) {
    event.preventDefault();
    item.showFullDescription = !item.showFullDescription;
  }
  
  // getSuggestions(): Product[] {
  //   this.products.filter(product => 
  //     !this.cartItems.some(item => item.productID === product.productID)
  //   );
  // }


  placeorder()
  {
    this.router.navigateByUrl('/address');
    
  }
}