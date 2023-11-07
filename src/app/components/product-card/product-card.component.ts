import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/data/products/product.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {json} from "ng2-validation/dist/json";
import {Order} from "../../models/Order";
import {CartItem} from "../../models/CartItem";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../services/data/orders/order.service";
import {query} from "@angular/animations";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product = new Product();
  @Input("show-action") showAction = true;
  @Input("cart") cart: Order | null = null;

  cartItem:CartItem|null=null;

  constructor( private shoppingCartService: ShoppingCartService) {
  }

  async addToCart() {
    this.cartItem=await this.shoppingCartService.addToCart(this.product);
  }

  async removeFromCart() {
    this.cartItem=await this.shoppingCartService.removeFromCart(this.product);
  }

  async ngOnInit() {
    this.cartItem=await this.shoppingCartService.getCartItem(this.product);
    console.log("cartItem get from ngInit in product-cart");
    console.log(this.cartItem);
  }

  //updateCount() {
  //  let carts: CartItem[] = <CartItem[]>this.cart?.carts.filter((cart) => {
   //   return (this.product.productId == (<Product>cart.product).productId)
  //  })
  //  if (carts.length > 0) {
  //    this.cartItem = <CartItem>carts.at(0);
  //  }
 // }
}
