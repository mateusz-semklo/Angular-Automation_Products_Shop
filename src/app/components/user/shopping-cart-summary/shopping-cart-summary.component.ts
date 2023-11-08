import {Component, Input} from '@angular/core';
import {Order} from "../../../models/Order";

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

  @Input('cart') cart:Order|null=null;

  constructor() {

  }

  protected readonly Order = Order;

  totalCost(){
    let total:number=0;
    this.cart?.carts.forEach((cartItem)=>{
      total+=(cartItem.count*cartItem.product.productPrice);
    })
    return total;
  }
}
