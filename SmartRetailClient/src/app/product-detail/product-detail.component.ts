import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { Review } from '../models/review.model';
import { ReviewService } from '../services/review.service';
import { map } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product= {
    productID: 0,
    name: '',
    description: '',
    price: 0,
    quantity: 0,
    categoryID: 0,
    imageUrl: '',
    isInWishlist: false
  };

  isL

  isOrdered = false;

  categoryname ='';

  productId : number =0;
  
  recommendedProducts:Product[] = [];
  quantity: number = 1; // Default quantity
  isInWishlist: boolean = false; // Track wishlist status
  showToast: boolean = false; // For showing the toast notification
  toastMessage: string = ''; // Message displayed in the toast
  toastTimeout: any = null; // To track the toast timeout
  curYear:number = (new Date()).getFullYear();
  isLoggedin = localStorage.getItem("isLoggedin")=='true';
  userName:string = '';

  customername = '';
  
  
  avg_rating:number = 0;

  // Example product data (You can replace this with a service call in a real application)
  products :Product[]=[];

  reviews : Review[]=[];

  review: Review = {
    rating: 0,
    comment: '',
    reviewDate: new Date(), // Initialize with current date and time in ISO format
    productID: 0,
    customername: ''
  };
  


  constructor(private router:Router,private wishlistservice : WishlistService,private cartservice : CartService,private route: ActivatedRoute,private productservice : ProductService,private reviewservice : ReviewService,private categoryservice : CategoryService) {}

  ngOnInit(): void {
    this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
     this.productservice.getproducts().subscribe((products)=>
      {
        this.products=products;
        this.productId = Number(this.route.snapshot.paramMap.get('id'));
        this.product = this.products.find(p => p.productID === this.productId) || {
          productID: 0,
          name: '',
          description: '',
          price: 0,
          quantity: 0,
          categoryID: 0,
          imageUrl: '',
          isInWishlist: false
        };


        this.recommendedProducts = this.products.filter((product)=>{
          return product.categoryID==this.product.categoryID && product.productID !=this.product.productID;
        });


        this.reviewservice.checkproductordered(this.productId).subscribe((response)=>{
          this.isOrdered = response;
          console.log(response);
          console.log(this.isOrdered);
        })
        console.log(this.productId);


        this.categoryservice.getcategories().pipe(map((categories) => {
          console.log('Fetched categories:', categories);
          categories.forEach(category => {
            console.log('Category:', category);
            if (category.categoryID == this.product?.categoryID) {
              this.categoryname = category.name;
            }
          });
        })).subscribe({
          next: () => console.log('Processing complete'),
          error: (err) => console.error('Error occurred:', err)
        });

        this.wishlistservice.checkwishlistproduct(this.productId).subscribe((response)=>{this.isInWishlist = response})






        console.log(this.categoryname);
        
        
        
        //this.categoryname = this.
        this.reviewservice.getreviews(this.productId).pipe(map((reviews) => {
          // console.log('Fetched reviews:', reviews);
          this.reviews = reviews;
          this.avg_rating = 0; // Initialize avg_rating to 0
          reviews.forEach(element => {
            this.avg_rating += element.rating;
            
          });
          console.log('Total rating:', this.avg_rating);
          console.log('Number of reviews:', this.reviews.length);
          if (this.reviews.length > 0) {
            this.avg_rating = (this.avg_rating / this.reviews.length); // Perform division only if length is greater than 0
            this.avg_rating = Math.floor(this.avg_rating)
            
          } else {
            this.avg_rating = 0; // Handle case where there are no reviews
          }
          
          console.log('Average rating:', this.avg_rating);
        })).subscribe({
          next: () => console.log('Processing complete'),
          error: (err) => console.error('Error occurred:', err)
        });

        
      }
      );

      
    
    // Get product ID from route parameters
    
    console.log(this.productId);
    //this.product = this.products[0];
    
    this.userName = localStorage.getItem("username") || 'Guest';
    
    // this.reviews.map(review => {
    //   this.avg_rating += review.rating;
    // })
    // this.avg_rating /= this.reviews.length;
    // this.avg_rating = Math.round(this.avg_rating) === 0 ? 1 : Math.round(this.avg_rating);
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("name");
    this.isLoggedin = false;
  }

  
  // Add to Cart
  // addToCart() {
  //   this.showToastMessage(`Added ${this.quantity} of ${this.product?.name} to cart.`);
  // }

  getRange(start: number, end: number): number[] {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  }

  addToCart() {


    if(this.isLoggedin == false)
      {
        this.router.navigateByUrl('/login');
      }

    this.cartservice.addcartproduct(this.productId,this.quantity).subscribe(()=>
    {
      // console.log(product.productID);
    })
    this.showToastMessage(`Added ${this.quantity} quantity of ${this.product.name} to cart.`);
    
  }

  // Toggle Wishlist
  toggleWishlist() {

    if(this.isLoggedin == false)
      {
        this.router.navigateByUrl('/login');
      }
  
    this.isInWishlist = !this.isInWishlist ;
    const action = this.isInWishlist ? 'added to' : 'removed from';
    if(action == 'added to'){
    this.wishlistservice.addwishlistproduct(this.productId).subscribe(()=>
      {
        // console.log(product.productID);
      })
    }
    else
    {
      this.wishlistservice.deletwishlistproduct(this.productId).subscribe(()=>{
        console.log()
      })
    }
    this.showToastMessage(`${this.product.name} ${action} wishlist.`);
  }

  // Show toast message
  showToastMessage(message: string) {
    // Clear the previous timeout if it exists
    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    // Briefly set showToast to false to trigger re-rendering in the UI
    this.showToast = false;

    // Delay the showing of the toast by 50ms to ensure the UI updates
    setTimeout(() => {
      // Set the new message and show the toast
      this.toastMessage = message;
      this.showToast = true;

      // Set a new timeout to hide the toast after 3 seconds
      this.toastTimeout = setTimeout(() => {
        this.showToast = false;
        this.toastTimeout = null; // Reset the timeout tracker
      }, 3000);
    }, 50); // Small delay for the UI to reset the previous state
  }

  isReviewFormVisible = false;
  //rating = 0;
  //reviewText = '';

  toggleReviewForm(): void {
    this.isReviewFormVisible = !this.isReviewFormVisible;
  }

  setRating(star: number): void {
    this.review.rating = star;
  }

  submitReview(): void {
    if (this.review.comment.trim()) {
      console.log('Rating:', this.review.rating);
      console.log('Review:', this.review.comment);

      // this.reviews.push({
      //   //"id": this.reviews.length + 1,
      //   "rating": this.rating,
      //   "comment": this.reviewText,
      //   //"date": Date.now()
      // });

      this.avg_rating = this.avg_rating * this.reviews.length;
      this.avg_rating += this.review.rating;
      this.review.productID = this.productId;
      this.reviewservice.addproductreview(this.review).subscribe((data)=>{
        this.reviewservice.getreviews(this.productId).subscribe((response)=>{
          this.reviews = response;
          console.log(this.reviews)
        })
        
      })
      
      this.avg_rating /= this.reviews.length;
      this.avg_rating = Math.round(this.avg_rating) === 0 ? 1 : Math.round(this.avg_rating);

      // Reset the form
      // this.rating = 0;
      // this.reviewText = '';
      this.isReviewFormVisible = false;
    } else {
      alert('Please write a review before submitting.');
    }
  }
}