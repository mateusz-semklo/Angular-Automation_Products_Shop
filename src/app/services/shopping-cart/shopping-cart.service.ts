import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom, lastValueFrom, Observable, Subject} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {Cart} from "../../models/Cart";
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private cartsService: CartsService, private ordersService: OrderService, private productService: ProductService) {
  }

  private subjectQuantity = new Subject<number>();
  async sendObservableQuantity() {
    console.log(await this.getQuantity());
    this.subjectQuantity.next(await this.getQuantity());
  }

  getObservableQuantity(): Observable<number> {
    return this.subjectQuantity.asObservable();
  }

  async updateOrCreateCart(cart: Cart) {
    let order: Order = <Order>await this.getOrCreateCart();
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

    this.ordersService.update(order, order.orderId)
      .subscribe((body) => {
        console.log(<Order>body);
      })

    await this.sendObservableQuantity();
  }

  async getOrCreateCart() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId)
      return <Order>await firstValueFrom(this.ordersService.getById(Number.parseInt(orderId)));

    let order: Order = new Order();
    order = <Order>await firstValueFrom(this.ordersService.create(order));
    localStorage.setItem("orderId", order.orderId.toString());
    return order;
  }

  async getCart() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId)
      return <Order>await firstValueFrom(this.ordersService.getById(Number.parseInt(orderId)));
    else return null;
  }

  async deleteCart() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId) {
      let order: Order | null = await this.getCart();
      if (order) <Order>await firstValueFrom(this.ordersService.delete(Number.parseInt(orderId)));
      localStorage.removeItem("orderId");
      let quantity:number=0;
      await this.sendObservableQuantity();
    }
  }

   async getQuantity() {
    let order: Order = <Order>await this.getOrCreateCart();
    let quantity: number = 0;
    order.carts.forEach((cart) => {
      quantity += cart.count;
    })
    return quantity;
  }


}
