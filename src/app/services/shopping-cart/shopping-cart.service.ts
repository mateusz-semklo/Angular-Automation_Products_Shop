import { Injectable } from '@angular/core';
import {Product} from "../../models/Product";
import {CartsService} from "../data/carts/carts.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(cartsService:CartsService) { }

  addToCard(product:Product){
    let card:string|null=localStorage.getItem("card");
    let products:Product[]=[];
    if(!card){
      products.push(product);
      localStorage.setItem("card",JSON.stringify(products))
    }
    else{
      products=JSON.parse(card);
      products.push(product);
      localStorage.setItem("card",JSON.stringify(products));
    }

  }
}
