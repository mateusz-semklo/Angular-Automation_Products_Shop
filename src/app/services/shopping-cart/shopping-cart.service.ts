import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom, lastValueFrom, Observable, Subject} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {Cart} from "../../models/Cart";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private cartsService: CartsService, private ordersService: OrderService, private productService: ProductService) {
  }

  private subjectName = new Subject<any>(); //need to create a subject
  sendUpdate(message: any) { //the component that wants to update something, calls this fn
    this.subjectName.next(message); //next() will feed the value in Subject
  }

  getUpdate(): Observable<any> { //the receiver component calls this function
    return this.subjectName.asObservable(); //it returns as an observable to which the receiver funtion will subscribe
  }

  async updateOrCreateCart(cart: Cart) {
    let order: Order = <Order>await this.getOrCreateOrder();
    console.log(cart);
    if (cart.cartProductId == 0) {
      let result_cart = <Cart>await firstValueFrom(this.cartsService.create(cart));
      cart.cartProductId = result_cart.cartProductId;
      order.carts.push(cart);
    } else if (cart.count == 0) {
      order.carts.splice(order.carts.indexOf(cart), 1);
      await firstValueFrom(this.cartsService.delete(cart.cartProductId));
    } else {
      cart = <Cart>await firstValueFrom(this.cartsService.update(cart, cart.cartProductId));
    }
    await this.getQuantity();

    this.ordersService.update(order, order.orderId)
      .subscribe((body) => {
        console.log(<Order>body);
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

  async getQuantity() {
    let order: Order = <Order>await this.getOrCreateOrder();
    let quantity: number = 0;
    order.carts.forEach((cart) => {
      quantity += cart.count;
    })
    this.sendUpdate(quantity);

  }


}
