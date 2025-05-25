import { Component } from '@angular/core';
import { Product } from '../models/product.model';
import { Wishlist } from '../models/wishlist.model';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { ProductService } from '../services/product.service';
import { HttpHeaders } from '@angular/common/http';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  
  products: Product[]=[];

    wishlistItems: Wishlist[] = [];

    isLoggedin:boolean = false;
    username :string | null | undefined;
    curYear:number = (new Date()).getFullYear();

    constructor(private wishlistservice : WishlistService,private productservice : ProductService,private cartservice : CartService){}

  ngOnInit(): void {
    this.wishlistservice.getwishlistproducts().subscribe((wishlistproducts)=> this.wishlistItems = wishlistproducts);
    this.productservice.getproducts().subscribe((products)=> this.products = products);
    this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
    if(this.isLoggedin == true)
      this.username = localStorage.getItem('username');
  }

  getProduct(productID: number): Product  {
    return this.products.find(product => product.productID === productID);
  }


  addToCart(wishlistitem: Wishlist) {
    this.cartservice.addcartproduct(wishlistitem.productID,1).subscribe(()=>
    {
      this.wishlistItems = this.wishlistItems.filter(item => item.productID !== wishlistitem.productID);
      this.removeProduct(wishlistitem.productID);
    })
    //this.showToastMessage(`Added ${product.name} to your cart.`);
  }

  removeProduct(productid: number) {
    this.wishlistservice.deletwishlistproduct(productid).subscribe(()=>
    {
      this.wishlistItems = this.wishlistItems.filter(item => item.productID !== productid);
    })
      
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("name");
    this.isLoggedin = false;
  }

}
