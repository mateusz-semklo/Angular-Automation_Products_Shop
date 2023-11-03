import {Category} from "./Category";
import {Product} from "./Product";

export class Cart {
  cartProductId: number|null = null;
  count: number|null=null;
  product:Product|null=null;
}
