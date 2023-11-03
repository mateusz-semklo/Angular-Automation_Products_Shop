import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/data/products/product.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {json} from "ng2-validation/dist/json";
import {Order} from "../../models/Order";
import {Cart} from "../../models/Cart";
import {Router} from "@angular/router";
import {OrderService} from "../../services/data/orders/order.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input("product") product: Product = new Product();
  @Input("show-action") showAction = true;
  @Input("shopping-cart") order: Order | null = null;

  cart:Cart=new Cart();
  constructor(private productService: ProductService, private cartService: ShoppingCartService, router: Router, private orderService: OrderService) {
  }

  addToCart() {
    this.updateCount();
    this.cartService.addToCard(this.product as Product);

  }

  ngOnInit(): void {
    this.updateCount();
  }

  updateCount(){
    let carts:Cart[]=<Cart[]>this.order?.carts.filter((cart)=>{
      return (this.product.productId==(<Product>cart.product).productId)
    })
    if(carts.length>0){
      this.cart=<Cart>carts.at(0);
    }
  }


}
