import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {Order} from "../../models/Order";

@Component({
  selector: 'app-shopping-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{

  order:Order|null=null;
  constructor(private shoppingCartService:ShoppingCartService) {
  }

   async ngOnInit() {
    this.order= await this.shoppingCartService.getOrCreateCart();
  }




}
