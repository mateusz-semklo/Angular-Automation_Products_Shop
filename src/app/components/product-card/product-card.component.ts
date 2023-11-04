import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/data/products/product.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {json} from "ng2-validation/dist/json";
import {Order} from "../../models/Order";
import {Cart} from "../../models/Cart";
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
  @Input("shopping-cart") order: Order | null = null;

  cart: Cart = new Cart();

  constructor(private productService: ProductService, private shoppingCartService: ShoppingCartService, private router: Router, private orderService: OrderService, private route: ActivatedRoute) {
  }

  async addToCart() {
    this.cart.count++;
    this.cart.product = this.product;
    await this.shoppingCartService.updateOrCreateCart(this.cart);
  }

  async removeFromCart() {
    if(this.cart.count>0)
      this.cart.count--;
    else this.cart.count=0;

    this.cart.product = this.product;
    await this.shoppingCartService.updateOrCreateCart(this.cart);
  }

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount() {

    let carts: Cart[] = <Cart[]>this.order?.carts.filter((cart) => {
      return (this.product.productId == (<Product>cart.product).productId)
    })
    if (carts.length > 0) {
      this.cart = <Cart>carts.at(0);
    }
    console.log(this.cart);

  }


}
