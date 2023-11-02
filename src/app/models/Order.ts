import {User} from "./User";
import {Product} from "./Product";

export class Order {
  orderId: number|null = null;
  orderDate: any|null;
  orderStreet: string |null = null;
  orderCity: string |null = null;
  orderCountry: string |null = null;
  orderPostCode: string |null = null;
  user: User |null = null;
  products: Array<Product> |null= [];

}
