import {User} from "./User";
import {Product} from "./Product";

export class Order {
  orderId: number = 0;
  orderDate: any;
  orderStreet: string = "";
  orderCity: string = "";
  orderCountry: string = "";
  orderPostCode: string = "";
  user: User = new User();
  products: Array<Product> = [];

}
