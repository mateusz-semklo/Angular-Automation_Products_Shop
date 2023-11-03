import {Category} from "./Category";
import {Cart} from "./Cart";

export class Product {
  productId: number=0;
  productName: string="";
  productDescription: string="";
  productImageUrl: string="";
  productPrice: number=0;
  category: Category=new Category();

}
