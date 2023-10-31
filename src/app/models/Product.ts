import {Category} from "./Category";

export class Product {
  productId: number|null = null;
  productName: string|null = null;
  productDescription: string|null=null;
  productImageUrl: string|null=null;
  productPrice: number|null=null;
  category: Category|null=null;
}
