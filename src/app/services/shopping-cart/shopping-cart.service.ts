import {Injectable} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {Cart} from "../../models/Cart";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private cartsService: CartsService, private ordersService: OrderService, private productService: ProductService) {
  }

  public async addToCard(product: Product) {
    let order: Order = <Order>await this.getOrder();
    console.log("order before")
    console.log(order);

    let carts: Cart[] = order.carts.filter((cart) => {
      if (cart.product?.productId == product.productId) {
        cart.count = cart.count as number + 1;
        this.cartsService.update(cart, <number>cart.cartProductId).subscribe();
        return true;
      } else return false;
    })

    if (carts == null || carts.length == 0) {
      console.log("in if check carts empty")
      let cart: Cart = new Cart();
      cart.product = product;
      cart.count = 1;
      console.log("cart before")
      console.log(cart);
      cart = <Cart>await firstValueFrom(this.cartsService.create(cart))
      console.log("cart after")
      console.log(cart);

      order.carts.push(cart);
      order = <Order>await firstValueFrom(this.ordersService.update(order, order.orderId));
      console.log("order after")
      console.log(order);

    }
  }

  async createOrder() {
    let order: Order = new Order();
    return await firstValueFrom(this.ordersService.create(order));
  }

  async getOrder(): Promise<Order | null> {await this.getOrCreateOrder()
    let order: Order;
    let orderId:string=await this.getOrCreateOrder()
    return <Order>await firstValueFrom(this.ordersService.getById(Number.parseInt(orderId)));
  }

  async getOrCreateOrder() {
    let orderId: string | null = localStorage.getItem("orderId");
    if (orderId) return orderId;

    let order: Order = await this.createOrder().then();
    localStorage.setItem("orderId", order.orderId.toString());
    return order.orderId.toString()
  }

}
