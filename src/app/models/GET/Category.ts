import {Product} from "./Product";

export class Category {
  public categoryName:string;
  public products;

  constructor(categoryName: string, products: Array<Product>) {
    this.categoryName = categoryName;
    this.products = products;
  }


}
