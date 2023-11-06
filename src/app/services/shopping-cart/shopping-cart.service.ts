import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom, lastValueFrom, Observable, Subject} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {CartItem} from "../../models/CartItem";
import {from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private cartsService: CartsService, private ordersService: OrderService, private productService: ProductService) {
  }

  private subjectQuantity = new Subject<number>();
  private subjectOrder:Subject<Order>=new Subject();

  async sendObservableQuantity() {
    this.subjectQuantity.next(await this.getQuantity());
  }

  getObservableQuantity(): Observable<number> {
    return this.subjectQuantity.asObservable();
  }
  async sendObservableInitCart() {
    this.subjectOrder.next(await this.getOrCreateCart());
  }
  async sendObservableCart(cart:Order) {
    this.subjectOrder.next(cart);
  }

  getObservableCart(): Observable<Order> {
    return this.subjectOrder.asObservable();
  }

  async updateCart(){

  }

  async getOrCreateCart() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId)
      return <Order>await firstValueFrom(this.ordersService.getById(Number.parseInt(orderId)));

    let order: Order = new Order();
    order = <Order>await firstValueFrom(this.ordersService.create(order));
    localStorage.setItem("orderId", order.orderId.toString());
    console.log("getOrCreateCart")
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
