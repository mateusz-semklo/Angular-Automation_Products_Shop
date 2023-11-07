import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-shopping-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  order: Order | null = null;
  quantity: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
    this.order = await this.shoppingCartService.getCart();
    this.quantity = await this.shoppingCartService.getQuantity();
  }

  totalCost() {
    let totalCost: number = 0;
    this.order?.carts.forEach((cart) => {
      totalCost += cart.count * cart.product.productPrice;
    })
    return totalCost;
  }

  async clearCart(){
    await this.shoppingCartService.deleteCart();
    window.location.reload();
  }


}
