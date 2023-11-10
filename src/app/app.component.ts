import {Component, HostListener, OnDestroy} from '@angular/core';
import {Order} from "./models/Order";
import {OrderService} from "./services/data/orders/order.service";
import {ShoppingCartService} from "./services/shopping-cart/shopping-cart.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AutomationShop';

 // @HostListener('document:visibilitychange', ['$event'])
 // unloadHandler($event: Event) {
  //  let cart:Order=<Order> await this.shoppingCart.getCart();
   // this.orderService.deleteOrder(cart);
   // if(localStorage.getItem("orderId")) localStorage.removeItem("orderId");
   // if(localStorage.getItem("token")) localStorage.removeItem("token");
 // }

  constructor(private orderService:OrderService,private shoppingCart:ShoppingCartService) {
  }



}
