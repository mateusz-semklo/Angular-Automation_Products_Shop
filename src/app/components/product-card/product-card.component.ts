import {Component, Input} from '@angular/core';
import {Product} from "../../models/Product";
import {ProductService} from "../../services/data/products/product.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input("product") product: Product =new Product();
  @Input("show-action") showAction=true;

  constructor(private productService:ProductService,private cartService:ShoppingCartService) {
  }
  addToCart(product:Product){
    this.cartService.addToCard(this.product);
  }


}
