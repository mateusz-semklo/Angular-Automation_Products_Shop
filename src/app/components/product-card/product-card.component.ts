import {Component, Input} from '@angular/core';
import {Product} from "../../models/Product";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input("product") product: Product =new Product();
  @Input("show-action") showAction=true;

}
