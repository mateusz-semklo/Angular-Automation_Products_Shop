import {Injectable, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";
import {OrderService} from "../data/orders/order.service";
import {Order} from "../../models/Order";
import {firstValueFrom, lastValueFrom, Observable, Subject} from "rxjs";
import {ProductService} from "../data/products/product.service";
import {CartItem} from "../../models/CartItem";
import {from} from 'rxjs';
import {state} from "@angular/animations";


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService{

  private subjectQuantity = new Subject<number>();
  constructor(private cartsService: CartsService, private ordersService: OrderService) {
  }

  async sendObservableQuantity() {
    this.subjectQuantity.next(await this.getQuantity());
  }

  getObservableQuantity(): Observable<number> {
    return this.subjectQuantity.asObservable();
  }

  async addToCart(product: Product) {
    return await this.updateCart(true, product)
  }

  async removeFromCart(product: Product) {
    return await this.updateCart(false, product)
  }

  async updateCart(state: boolean, product: Product) {
    let cartItem = <CartItem>await this.getCartItem(product);
    let cart: Order = <Order>await this.getOrCreateCart();
    if (state) {
      if (cartItem == null || cartItem.cartProductId == 0) {
        let cartItem: CartItem = <CartItem>await this.createCartItem(product);
        console.log("cartItem created in shoppingCart");
        console.log(cartItem);
        cart.carts.push(cartItem);
        cart = <Order>await firstValueFrom(this.ordersService.update(cart, cart.orderId));
        console.log("cart update in shoppingCart");
        console.log(cart);
        await this.sendObservableQuantity();
        return cartItem;
      } else {
        cartItem.count++;
        cartItem = await this.updateCartItem(cartItem);
        console.log("cartItem update ++count in shoppingCart");
        console.log(cartItem);
        cart = <Order>await this.getCart();
        console.log("cart update in shoppingCart");
        console.log(cart);
        await this.sendObservableQuantity();
        return cartItem;
      }
    } else {
      if (cartItem.count > 1) {
        cartItem.count--;
        cartItem = await this.updateCartItem(cartItem);
        console.log("cartItem update --count in shoppingCart");
        console.log(cartItem);
        cart = <Order>await this.getCart();
        console.log("cart update in shoppingCart");
        console.log(cart);
        await this.sendObservableQuantity();
        return cartItem;
      } else if (cartItem.count == 1) {

        cart = <Order>await this.getCart();

        let carts=cart.carts.filter((cartItemx)=>{
          return (cartItemx.cartProductId==cartItem.cartProductId)
        });
        let cartItemResult=carts.at(0);
        let index:number=cart.carts.indexOf(<CartItem>cartItemResult);
        console.log("index");
        console.log(index);

        cart.carts.splice(index, 1);
        this.deleteCartItem(cartItem);
        console.log("cartItem delete cartItem in shoppingCart");

        cart = <Order>await firstValueFrom(this.ordersService.update(cart, cart.orderId));
        console.log("cart update in shoppingCart");
        console.log(cart);
        await this.sendObservableQuantity();
        return null;
      } else {
        return null;

      }
    }

  }

  async getOrCreateCart() {
    let cart: Order | null;
    if ((cart = await this.getCart())) {
      console.log("found cart in shopping service")
      console.log(cart);
      return cart;
    }

    cart = new Order();
    cart = <Order>await firstValueFrom(this.ordersService.create(cart));
    console.log("create cart in shopping service");
    console.log(cart);
    localStorage.setItem("orderId", cart.orderId.toString());
    return cart;
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
      order?.carts.forEach((cartItem)=>{
        this.deleteCartItem(cartItem);
      })
      order?.carts.splice(0,order?.carts.length)
      if (order) <Order>await firstValueFrom(this.ordersService.delete(Number.parseInt(orderId)));
      localStorage.removeItem("orderId");
      let quantity: number = 0;
    }
  }

  async getQuantity() {
    let order: Order = <Order>await this.getCart();
    let quantity: number = 0;
    if(order) {
      order.carts.forEach((cart) => {
        quantity += cart.count;
      })
    }
    return quantity;
  }

////////////////////CartItem///////////////////////////
  async getCartItem(product: Product) {
    let cart = await this.getCart();
    let carts: CartItem[] = <CartItem[]>cart?.carts.filter((cart) => {
      return (product.productId == (<Product>cart.product).productId)
    })
    if (carts.length > 0) {
      return <CartItem>carts.at(0);
    } else {
      return null;
    }
  }

  async createCartItem(product: Product) {
    let cartItem: CartItem = new CartItem();
    cartItem.count = 1;
    cartItem.product = product;
    return <CartItem>await firstValueFrom(this.cartsService.create(cartItem));
  }

  async updateCartItem(cartItem: CartItem) {
    return <CartItem>await firstValueFrom(this.cartsService.update(cartItem, cartItem.cartProductId));
  }

  deleteCartItem(cartItem: CartItem) {
    this.cartsService.delete(cartItem.cartProductId).subscribe();
  }




}
