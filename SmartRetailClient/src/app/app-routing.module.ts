import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MyDetailsComponent } from './user-profile/my-details/my-details.component';
import { MyOrdersComponent } from './user-profile/my-orders/my-orders.component';
import { AccountSettingsComponent } from './user-profile/account-settings/account-settings.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressComponent } from './address/address.component';
import { InvoiceComponent } from './user-profile/my-orders/invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentLoadingComponent } from './payment-loading/payment-loading.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin-dashboard/add-product/add-product.component';
import { EditProductComponent } from './admin-dashboard/edit-product/edit-product.component';
import { ManageStockComponent } from './admin-dashboard/manage-stock/manage-stock.component';
import { LoginComponent } from './login/login.component';
import { LoginLoadingComponent } from './login-loading/login-loading.component';
import { LoginGuard } from './guards/login.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminloginLoadingComponent } from './admin-login/adminlogin-loading/adminlogin-loading.component';
import { adminloginGuard } from './guards/adminlogin.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home | Smart Retail' },
  { path: 'product/:id', component: ProductDetailComponent, title: 'Product Details | Smart Retail' },
  { path: 'wishlist', component: WishlistComponent, title: 'Wishlist | Smart Retail' },
  { path: 'cart', component: CartComponent, title: 'Cart | Smart Retail' },
  { path: 'address', component: AddressComponent, title: 'Address | Smart Retail' },
  { path: 'payment', component: PaymentComponent, title: 'Payment | Smart Retail' },
  { path: 'login', component: LoginComponent, canDeactivate: [LoginGuard], title: 'Login | Smart Retail' },
  { path: 'payment-loading', component: PaymentLoadingComponent, title: 'Payment Loading | Smart Retail' },
  { path: 'login-loading', component: LoginLoadingComponent, title: 'Login Loading | Smart Retail' },
  { path: 'admin-login', component: AdminLoginComponent, title: 'Admin Login | Smart Retail' },
  { path: 'adminlogin-loading', component: AdminloginLoadingComponent, title: 'Admin Login Loading | Smart Retail' },
  {
    path: 'profile', component: UserProfileComponent, title: 'User Profile | Smart Retail',
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full' },
      { path: 'details', component: MyDetailsComponent, title: 'My Details | Smart Retail' },
      { path: 'orders', component: MyOrdersComponent, title: 'My Orders | Smart Retail' },
      { path: 'orders/invoice/:id', component: InvoiceComponent, title: 'Invoice | Smart Retail' },
      { path: 'settings', component: AccountSettingsComponent, title: 'Account Settings | Smart Retail' },
    ]
  },
  {
    path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [adminloginGuard], title: 'Admin Dashboard | Smart Retail',
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'add-product', component: AddProductComponent, title: 'Add Product | Smart Retail' },
      { path: 'edit-product', component: EditProductComponent, title: 'Edit Product | Smart Retail' },
      { path: 'manage-stock', component: ManageStockComponent, title: 'Manage Stock | Smart Retail' }
    ]
  },
  { path: '**', redirectTo: 'orders', title: 'Orders | Smart Retail' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }