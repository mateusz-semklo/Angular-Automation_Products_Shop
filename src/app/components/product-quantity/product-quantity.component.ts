<<<<<<< HEAD
import {Component, EventEmitter, Input, Output} from '@angular/core';
=======
import {Component, Input} from '@angular/core';
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975
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
<<<<<<< HEAD
  @Input("cartItem") cartItem:CartItem|null=null;
  @Output() eventCartItem:EventEmitter<CartItem>=new EventEmitter();
=======
  @Input("show-action") showAction = true;

  cartItem:CartItem|null=null;
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975

  constructor( private shoppingCartService: ShoppingCartService) {
  }

  async addToCart() {
    this.cartItem=await this.shoppingCartService.addToCart(this.product);
<<<<<<< HEAD
    this.eventCartItem.emit(<CartItem>this.cartItem);
=======
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975
  }

  async removeFromCart() {
    let index:number=<number> this.cartItem?.count;
    if(index>0) {
      this.cartItem = await this.shoppingCartService.removeFromCart(this.product);
    }
<<<<<<< HEAD
    this.eventCartItem.emit(<CartItem>this.cartItem);
=======
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975

  }

  async ngOnInit() {
    this.cartItem=await this.shoppingCartService.getCartItem(this.product);
    console.log("cartItem get from ngInit in product-cart");
    console.log(this.cartItem);
  }

}
