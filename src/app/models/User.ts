import {Order} from "./Order";

export class User {
  username: string = "";
  enabled: boolean = false;
  userEmail: string = "";
  userFirstname: string = "";
  userLastname: string = "";
  userStreet: string = "";
  userCity: string = "";
  userCountry: string = "";
  userPostCode: string = "";
  authorities: Array<String> = [];
  orders: Array<Order> = [];
}
