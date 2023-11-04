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
    await this.updateOrCreateCart(product,true);

  }
  public async removeFromCard(product: Product) {
    await this.updateOrCreateCart(product,false);
  }

  async updateOrCreateCart(product: Product, direct: boolean) {
    let order: Order = <Order>await this.getOrCreateOrder();
    let carts: Cart[] = order.carts.filter((cart) => {
      if (cart.product?.productId == product.productId) {
        if (direct) cart.count = cart.count as number + 1;
        else {
          if (cart.count > 0)
            cart.count = cart.count as number - 1;
        }
        this.cartsService.update(cart, <number>cart.cartProductId).subscribe();
      }
    })

    if (carts == null || carts.length == 0) {
      let cart: Cart = new Cart();
      cart.product = product;
      cart.count = 1;
      cart = <Cart>await firstValueFrom(this.cartsService.create(cart))
      order.carts.push(cart);
      order = <Order>await firstValueFrom(this.ordersService.update(order, order.orderId));
      console.log("order:")
      console.log(order);
    }

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
