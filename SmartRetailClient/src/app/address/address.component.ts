import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { Product } from '../models/product.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  @ViewChild('addressFormModal') addressFormModal!: ElementRef;
  addresses: Address[] = [];
  products: Product[] = [];

  cartItems: Cart[] = [];


  
  isLoggedin:boolean = false;
  username :string | null | undefined;
  
  

  // discount = 50;
  // shippingFee = 20;
  // platformFee = 10;
 

  
  

  // discount = 50;
  // shippingFee = 20;
  // platformFee = 10;

  addressForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private cartservice : CartService,private productservice : ProductService) {
    
  }

  ngOnInit(): void {


    this.isLoggedin = localStorage.getItem('isLoggedin')=='true';
    if(this.isLoggedin == true)
      this.username = localStorage.getItem('username');


    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email : ['',[Validators.required,Validators.email]],
      street: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });


    this.cartservice.getcartproducts().subscribe((cartItems)=>{
      this.cartItems = cartItems;
      this.getEstimatedDeliveryDate();
    });
    this.productservice.getproducts().subscribe((products)=>{this.products = products});
   
   

  }

  getProduct(productID: number | undefined): Product | undefined {
    return this.products.find(product => product.productID === productID);
  }

  getTotalMRP() {
    return this.cartItems.reduce((total, item) => {
      const product = this.getProduct(item.productID);
      return total + (product?.price || 0) * (item.productQuantity || 0);
    }, 0);
  }

  getTotalAmount() {
    return this.getTotalMRP() +  (this.getTotalMRP() * 0.15) + (this.getTotalMRP()>0 ? (this.getTotalMRP()>=1000 ? 25 : 70) : 0);
  }

  showAddressForm() {
    this.addressFormModal.nativeElement.style.display = 'block';
    //document.body.style.backgroundColor = "rgba(0,0,0,0.5)"; // Lighten the background
    
    const element = document.getElementById('mt-5');
    if (element) {
        element.style.opacity = '0.2';
    }
  }

  hideAddressForm() {
    this.addressFormModal.nativeElement.style.display = 'none';
    
    const element = document.getElementById('mt-5');
    if (element) {
        element.style.opacity = '1';
    }
  }

  addAddress() {
    if (this.addressForm.valid) {
      const newAddress = this.addressForm.value as Address;
      this.addresses.push(newAddress);
      this.hideAddressForm();
      this.resetForm();
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.addressForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email : ['',[Validators.required,Validators.email]],
      street: ['', Validators.required],
      city: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });
  }

  getEstimatedDeliveryDate() {
    console.log("In Delivery Function")
    console.log(this.cartItems)
    this.cartItems.forEach(item => {
      
    
    const today = new Date();
    const randomDays = Math.floor(Math.random()*9) + 3; // Random days between two to seven weeks
    const deliveryDate = new Date(today.setDate(today.getDate() + randomDays));
    item.deliverydate = deliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  });
  }

  isFieldInvalid(field: string): boolean | undefined {
    return (
      !this.addressForm.get(field)?.value && this.addressForm.get(field)?.touched
    );
  }

  isvalid(field : string) : boolean
  {
    return (this.addressForm.get(field)?.value && !this.addressForm.get(field)?.valid)
  }
    

  onSubmit(): void {
    this.addAddress();
  }

  paynow() {
    const navigationExtras: NavigationExtras = {
      state: {
        address : this.addresses[0] as Address,
        totalAmount : this.getTotalAmount()
      }
    };
    this.router.navigate(['/payment'], navigationExtras);
    
  }

  removeaddress(removeaddress : Address)
  {
    this.addresses = this.addresses.filter((address)=>address !== removeaddress);
  }

  OnLogout() {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("name");
    this.isLoggedin = false;
  }
  

}