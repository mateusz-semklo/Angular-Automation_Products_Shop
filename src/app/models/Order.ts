import {User} from "./User";
import {Product} from "./Product";
import {Cart} from "./Cart";

export class Order {
  orderId: number = 0;
  orderDate: any|null;
  orderStreet: string |null = null;
  orderCity: string |null = null;
  orderCountry: string |null = null;
  orderPostCode: string |null = null;
  user: User |null = null;
  carts: Array<Cart> = [];

}
