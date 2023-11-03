import { Component } from '@angular/core';
import {ProductService} from "../../services/data/products/product.service";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/Product";
import {UrlsService} from "../../services/url/urls.service";

@Component({
  selector: 'app-shopping-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  constructor() {
  }

}
