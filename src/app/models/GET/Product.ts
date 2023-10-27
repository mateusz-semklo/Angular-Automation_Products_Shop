import {Category} from "./Category";

export class Product {
  productId: number;
  productName: string;
  productDescription: string;
  productImageUrl: string;
  productPrice: number;
  category: Category;


  constructor(productId: number, productName: string, productDescription: string, productImageUrl: string, productPrice: number, category: Category) {
    this.productId = productId;
    this.productName = productName;
    this.productDescription = productDescription;
    this.productImageUrl = productImageUrl;
    this.productPrice = productPrice;
    this.category = category;
  }
}
