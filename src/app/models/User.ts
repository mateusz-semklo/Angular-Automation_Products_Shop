import {Order} from "./Order";

export class User {
  username: string |null = null;
  enabled: boolean |null=null;
  userEmail: string|null = null;
  userFirstname: string|null = null;
  userLastname: string|null = null;
  userStreet: string|null = null;
  userCity: string |null = null;
  userCountry: string |null = null;
  userPostCode: string |null = null;
  authorities: Array<String>|null = [];
  orders: Array<Order>|null = [];
}
