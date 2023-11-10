import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {CartItem} from "../../models/CartItem";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";

@Component({
  selector: 'product-cart2',
  templateUrl: './product-cart2.component.html',
  styleUrls: ['./product-cart2.component.css']
})
export class ProductCart2Component implements OnInit{
  @Input("product") product: Product = new Product();
  @Input("show-action") showAction = true;

  cartItem:CartItem|null=null;
  public isCollapsed = true;

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
  }

  getCartItem(cartItem:CartItem){
    this.cartItem=cartItem;

  }

}
