import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/data/products/product.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {json} from "ng2-validation/dist/json";
import {Order} from "../../models/Order";
import {CartItem} from "../../models/CartItem";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/data/orders/order.service";
import {query} from "@angular/animations";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input("product") product: Product = new Product();
  @Input("show-action") showAction = true;

  private subscriptionCart: Subscription = new Subscription();
  cart: Order | null = null;
  cartItem: CartItem = new CartItem();

  constructor(private shoppingCartService: ShoppingCartService) {
    this.subscriptionCart = this.shoppingCartService.getObservableCart().subscribe((cart) => {
      this.cart = cart
      console.log("kon");
    })

  }

  async addToCart() {
  //  await this.shoppingCartService.sendObservableInitCart();
  }

  async removeFromCart() {
  //  await this.shoppingCartService.updateCart();
  }

  ngOnInit(): void {
    this.subscriptionCart = this.shoppingCartService.getObservableCart().subscribe((cart) => {
      this.cart = cart
      console.log("nginit");
    })

  }
  ngOnDestroy(): void {
    this.subscriptionCart.unsubscribe();
  }
  getCartItem() {
    if (this.cart) {
      let carts: CartItem[] = <CartItem[]>this.cart.carts.filter((cart) => {
        return (this.product.productId == (<Product>cart.product).productId)
      })
      if (carts.length > 0) {
        this.cartItem = <CartItem>carts.at(0);
      }
    }
  }

}
