import {Component, Input} from '@angular/core';
import {Product} from "../../models/Product";
import {CartItem} from "../../models/CartItem";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input("product") product: Product = new Product();
  @Input("show-action") showAction = true;

  cartItem:CartItem|null=null;

  constructor( private shoppingCartService: ShoppingCartService) {
  }

  async addToCart() {
    this.cartItem=await this.shoppingCartService.addToCart(this.product);
  }

  async removeFromCart() {
    let index:number=<number> this.cartItem?.count;
    if(index>0) {
      this.cartItem = await this.shoppingCartService.removeFromCart(this.product);
    }

  }

  async ngOnInit() {
    this.cartItem=await this.shoppingCartService.getCartItem(this.product);
    console.log("cartItem get from ngInit in product-cart");
    console.log(this.cartItem);
  }

}
