import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./services/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'check-out', component: CheckOutComponent},
      {path: 'order-success', component: OrderSuccessComponent},
      {path: 'my/orders', component: MyOrdersComponent},
      {path: 'login', component: LoginComponent},
      {path: 'admin/products', component: AdminProductsComponent},
      {path: 'admin/orders', component: AdminOrdersComponent}
    ]),
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
