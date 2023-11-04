import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom, lastValueFrom} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {Cart} from "../../models/Cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private cartsService: CartsService, private ordersService: OrderService, private productService: ProductService) {
  }



  async updateOrCreateCart(cart: Cart) {
    let order: Order = <Order>await this.getOrCreateOrder();
    console.log(cart);
    if (cart.cartProductId == 0) {
      let result_cart= <Cart>await firstValueFrom(this.cartsService.create(cart));
      cart.cartProductId=result_cart.cartProductId;
      order.carts.push(cart);
    } else {
      cart = <Cart>await firstValueFrom(this.cartsService.update(cart, cart.cartProductId));
    }
    this.ordersService.update(order, order.orderId)
      .subscribe((body)=>{
        console.log(<Order> body);
      })

  }


  async getOrCreateOrder() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId)
      return <Order>await firstValueFrom(this.ordersService.getById(Number.parseInt(orderId)));

    let order: Order = new Order();
    order = <Order>await firstValueFrom(this.ordersService.create(order));
    localStorage.setItem("orderId", order.orderId.toString());
    return order;
  }


}
