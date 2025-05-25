import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyDetailsComponent } from './user-profile/my-details/my-details.component';
// import { MyAddressComponent } from './user-profile/my-address/my-address.component';
import { MyOrdersComponent } from './user-profile/my-orders/my-orders.component';
import { AccountSettingsComponent } from './user-profile/account-settings/account-settings.component';
import { LoginComponent } from './login/login.component'; 
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin-dashboard/add-product/add-product.component';
import { EditProductComponent } from './admin-dashboard/edit-product/edit-product.component';
import { ManageStockComponent } from './admin-dashboard/manage-stock/manage-stock.component';



import { WishlistComponent } from './wishlist/wishlist.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { InvoiceComponent } from './user-profile/my-orders/invoice/invoice.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { PaymentLoadingComponent } from './payment-loading/payment-loading.component';
import { LoginLoadingComponent } from './login-loading/login-loading.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminloginLoadingComponent } from './admin-login/adminlogin-loading/adminlogin-loading.component';




@NgModule({
  declarations: [
    AdminloginLoadingComponent,
    AdminLoginComponent,
    AppComponent,
    HomepageComponent,
    ProductDetailComponent,
    UserProfileComponent,
    MyDetailsComponent,
    // MyAddressComponent,
    MyOrdersComponent,
    AccountSettingsComponent,
    LoginComponent,
    PaymentComponent,
    AdminDashboardComponent,
    AddProductComponent,
    EditProductComponent,
    ManageStockComponent,
    
    CartComponent,
    WishlistComponent,
    AddressComponent,
    InvoiceComponent,
    PaymentLoadingComponent,
    LoginLoadingComponent,
    AdminLoginComponent,
    AdminloginLoadingComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  
  providers: [
    
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptor,
      multi : true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
