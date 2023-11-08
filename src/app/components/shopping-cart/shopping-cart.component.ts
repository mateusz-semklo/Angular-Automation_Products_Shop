import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {Order} from "../../models/Order";
import {CartItem} from "../../models/CartItem";

@Component({
  selector: 'app-shopping-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

<<<<<<< HEAD
  cart: Order | null = null;
=======
  order: Order | null = null;
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975
  quantity: number = 0;

  constructor(private shoppingCartService: ShoppingCartService) {
  }

  async ngOnInit() {
<<<<<<< HEAD
    this.cart = await this.shoppingCartService.getCart();
=======
    this.order = await this.shoppingCartService.getCart();
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975
    this.quantity = await this.shoppingCartService.getQuantity();
  }

  totalCost() {
    let totalCost: number = 0;
<<<<<<< HEAD
    this.cart?.carts.forEach((cart) => {
=======
    this.order?.carts.forEach((cart) => {
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975
      totalCost += cart.count * cart.product.productPrice;
    })
    return totalCost;
  }

  async clearCart(){
    await this.shoppingCartService.deleteCart();
    window.location.reload();
  }

<<<<<<< HEAD
  async getCartItem(cartItem:CartItem){
    this.cart = await this.shoppingCartService.getCart();
    this.quantity = await this.shoppingCartService.getQuantity();
    this.totalCost();

  }

=======
>>>>>>> 213ba1a7da7a2ee7ef190301e51b3d2ef40b6975

}
