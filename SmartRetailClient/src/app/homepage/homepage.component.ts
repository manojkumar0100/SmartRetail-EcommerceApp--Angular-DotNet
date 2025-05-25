import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { catchError, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { LoginService } from '../services/login.service';

declare var bootstrap: any; // Ensure you have Bootstrap JS imported

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  
  curYear:number = (new Date()).getFullYear();

  username :string | null | undefined;
  isLoggedin:boolean = false;

  

  // onLoginSuccess(islogged : boolean) {
  //   console.log("JJ");
  //   // const modal = bootstrap.Modal.getInstance(document.getElementById('loginModalLong'));
  //   // if (modal) {
  //   //   modal.hide(); // Close the modal
  //   // }

    
  //   console.log("J");
  //   this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
  //   this.username= localStorage.getItem('username');
  //   console.log(this.username);
  //   console.log(islogged);
  //   console.log(this.username)

  // }

  // Sample product data with categories for filtering

  products : Product[]=[];
  // products = [
  //   { id: '1', name: 'Smartphone X', price: '$799', category: 'Electronics', image: 'assets/images/smartphone.jpeg', isInWishlist: false },
  //   { id: '2', name: 'Laptop Pro', price: '$1299', category: 'Electronics', image: 'assets/images/laptop.jpeg', isInWishlist: false },
  //   { id: '3', name: 'Wireless Earbuds', price: '$199', category: 'Audio', image: 'assets/images/earbuds.jpeg', isInWishlist: false },
  //   { id: '4', name: 'Smart Watch', price: '$299', category: 'Wearables', image: 'assets/images/smartwatch.jpeg', isInWishlist: false },
  //   { id: '5', name: '4K Smart TV', price: '$999', category: 'Home Appliances', image: 'assets/images/tv.jpeg', isInWishlist: false },
  //   { id: '6', name: 'Bluetooth Speaker', price: '$149', category: 'Audio', image: 'assets/images/speaker.jpeg', isInWishlist: false },
  //   { id: '7', name: 'Gaming Console', price: '$499', category: 'Gaming', image: 'assets/images/console.jpeg', isInWishlist: false },
  //   { id: '8', name: 'Camera Pro', price: '$899', category: 'Electronics', image: 'assets/images/camera.jpeg', isInWishlist: false },
  //   { id: '9', name: 'Electric Kettle', price: '$99', category: 'Home Appliances', image: 'assets/images/kettle.jpeg', isInWishlist: false },
  //   { id: '10', name: 'Wireless Mouse', price: '$49', category: 'Electronics', image: 'assets/images/mouse.jpeg', isInWishlist: false }
  // ];

  categories : Category[]=[];

  Img = 'assets/images/camera.jpeg'

  // categories = [
  //   { name: 'All', image: 'assets/images/camera.jpeg' },
  //   { name: 'Electronics', image: 'assets/images/laptop.jpeg' },
  //   { name: 'Wearables', image: 'assets/images/smartwatch.jpeg' },
  //   { name: 'Audio', image: 'assets/images/earbuds.jpeg' },
  //   { name: 'Home Appliances', image: 'assets/images/kettle.jpeg' },
  //   { name: 'Gaming', image: 'assets/images/console.jpeg' }
  // ];


  showToast: boolean = false;
  toastMessage: string = '';
  toastTimeout: any = null;

  // Filtered products array (initially all products are shown)
  filteredProducts = this.products;

  // Search query variable
  searchQuery: string = '';
  

  constructor(private router: Router,private productservice : ProductService,private categoryservice : CategoryService,private cartservice : CartService,private wishlistservice : WishlistService,private loginService : LoginService) {console.log("This is the Constructor");
    // console.log(this.isLoggedin);
    this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
    this.username= localStorage.getItem('username');
    // console.log(this.isLoggedin);
    // console.log(this.username);
    // console.log(localStorage.getItem('username'));
    // console.log(localStorage.getItem('isLoogedin'));
    this.getcategories();
    this.getproducts();
    this.assignCatImg();
    // console.log(this.categories);
    // console.log(this.products);
  }

  getproducts()
  {
    this.productservice.getproducts().subscribe((products)=>{
      this.products=products;
      this.filteredProducts = products;
      this.assignCatImg();

      this.products.map((product)=>{
        this.wishlistservice.checkwishlistproduct(product.productID).subscribe((response)=>{
          product.isInWishlist= response
        });
      })


    }) ;
  }

  getcategories()
  {
    this.categoryservice.getcategories().subscribe((categories) =>
      {this.categories = categories;this.assignCatImg();}
        
      )
  }

  
  ngOnInit(): void {
    this.filteredProducts = this.products;
    // console.log(this.filteredProducts);
    // console.log("This is the Onit");
    // console.log(this.isLoggedin);
    // this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
    // this.username= localStorage.getItem('username');

  this.isLoggedin = localStorage.getItem('isLoggedin') === 'true';     
  //this.loginService.username$.subscribe((username) => {       this.username = username;     });   
  this.username = localStorage.getItem('username');
  this.assignCatImg();


  }


  assignCatImg() {
    // console.log("In Image ");
    // console.log(this.categories);
    this.categories.forEach(category => {
      // Filter products by categoryID
      const filterProducts = this.products.filter(product => product.categoryID === category.categoryID);
      // console.log(category.categoryID);
      // console.log(filterProducts);
      // console.log(this.products);
      // Select a random product from the filtered list
      if (filterProducts.length > 0) {
       
        const randomIndex = Math.floor(Math.random() * filterProducts.length);
        const randomProduct = filterProducts[randomIndex];

        // console.log("IN filter")
        // Assign the image URL of the selected product to the category
        category.imageUrl = randomProduct.imageUrl;
      }
    });
  }












  // Method to filter products by category
  filterByCategory(categoryID: number): void {
    console.log(categoryID);
    if (categoryID == 0) {
      this.filteredProducts = this.products; // Show all products
    } 
    else {
      console.log(categoryID);
      this.filteredProducts = this.products.filter(product => product.categoryID === categoryID)
      
    
    }
  }

  // Method to handle search input changes
  onSearchChange(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredProducts = this.products.filter(product => 
      product.name.toLowerCase().includes(query)
    );
  }

  // Toggle Wishlist
  // toggleWishlist(product: any) {
  //   product.isInWishlist = !product.isInWishlist;
  //   const action = product.isInWishlist ? 'added to' : 'removed from';
  //   this.showToastMessage(`${product.name} ${action} your wishlist.`);
  // }


  

  

  // Add to Cart
  addToCart(product: Product) {

    if(this.isLoggedin == false)
    {
      this.router.navigateByUrl('/login');
    }

    this.cartservice.addcartproduct(product.productID,1).subscribe(()=>
    {
      console.log(product.productID);
    })
    this.showToastMessage(`Added ${product.name} to your cart.`);
  }


  toggleWishlist(product: Product) {

    if(this.isLoggedin == false)
      {
        this.router.navigateByUrl('/login');
      }


    product.isInWishlist = !product.isInWishlist ;
    const action = product.isInWishlist ? 'added to' : 'removed from';
    if(action == 'added to'){
    this.wishlistservice.addwishlistproduct(product.productID).subscribe(()=>
      {
        // console.log(product.productID);
      })
    }
    else
    {
      this.wishlistservice.deletwishlistproduct(product.productID).subscribe(()=>{
        console.log()
      })
    }
    this.showToastMessage(`${product.name} ${action} wishlist.`);


  }

    // Show toast message
  showToastMessage(message: string) {
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.showToast = false;

    setTimeout(() => {
      this.toastMessage = message;
      this.showToast = true;

      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
        this.toastTimeout = null;
      }, 3000);
    }, 50); // Small delay for UI to reset
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    this.isLoggedin = false;
  }

  ngOnDestory()
  {
    console.log("Far From Home")
  }


}