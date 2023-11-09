import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {UrlsService} from "../../url/urls.service";
import {Order} from "../../../models/Order";
import {firstValueFrom, Observable} from "rxjs";

import {CartsService} from "../carts/carts.service";
import {CartItem} from "../../../models/CartItem";

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService {
  constructor(httpClient: HttpClient, urlService: UrlsService, private cartService: CartsService) {
    super(httpClient, <string>urlService.urls.get("orders"));
  }

  deleteOrder(order: Order) {
    let cartItems = order.carts;
    cartItems.forEach((cartItem) => {
      this.cartService.delete(cartItem.cartProductId).subscribe();
    })
    order.carts = [];
    this.delete(order.orderId).subscribe();
  }


  getTotalPriceOrder(order: Order) {
    let totalPrice: number = 0;
    if (order) {
      order.carts.forEach((cartItem) => {
        totalPrice += (cartItem.count * cartItem.product.productPrice);
      })
    }
    return totalPrice;
  }

  getTotalQuantityOrder(order: Order) {
    let totalQuantity: number = 0;
    if (order) {
      order.carts.forEach((cartItem) => {
        totalQuantity += cartItem.count;
      })
    }
    return totalQuantity;
  }

}
