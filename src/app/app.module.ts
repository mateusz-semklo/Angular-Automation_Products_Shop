import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/user/check-out/check-out.component';
import { OrderSuccessComponent } from './components/user/order-success/order-success.component';
import { UserOrdersComponent } from './components/user/user-orders/user-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import {RouterModule} from "@angular/router";
import { LoginComponent } from './components/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from "./services/auth/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuardService} from "./services/quards/auth-guard.service";
import {AdminAuthGuardService} from "./services/quards/admin-auth-guard.service";
import {ProductFormComponent} from "./components/admin/product-form/product-form.component";
import {DataService} from "./services/data/data.service";
import {UserService} from "./services/data/users/user.service";
import {CategoryService} from "./services/data/categories/category.service";
import {ProductService} from "./services/data/products/product.service";
import {OrderService} from "./services/data/orders/order.service";
import {NgOptimizedImage} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {PaginatorIntlService} from "./services/paginator/paginator-intl.service";
import {UrlsService} from "./services/url/urls.service";
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {ShoppingCartService} from "./services/shopping-cart/shopping-cart.service";
import {CartsService} from "./services/data/carts/carts.service";
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { ShoppingCartSummaryComponent } from './components/user/shopping-cart-summary/shopping-cart-summary.component';
import {AppErrorHandler} from "./common/errors/AppErrorHandler";
import { InfoComponent } from './components/info/info.component';
import { ProductCart2Component } from './components/product-cart2/product-cart2.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    UserOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    InfoComponent,
    ProductCart2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'login', component: LoginComponent},
      {path: 'info', component: InfoComponent},

      {path: 'user/check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'user/order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'user/orders', component: UserOrdersComponent, canActivate: [AuthGuardService]},
      {
        path: 'admin/products/product-form',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthGuardService]
      },
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService]}

    ]),
    NgbModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    AdminAuthGuardService,
    DataService,
    UserService,
    CategoryService,
    ProductService,
    OrderService,
    PaginatorIntlService,
    UrlsService,
    ShoppingCartService,
    CartsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
