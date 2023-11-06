import {Category} from "./Category";
import {Product} from "./Product";

export class CartItem {
  cartProductId: number=0;
  count: number=0;
  product:Product=new Product();
}
