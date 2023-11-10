import {Component} from '@angular/core';
import {User} from "../../../models/User";
import {Order} from "../../../models/Order";
import {UserService} from "../../../services/data/users/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {OrderService} from "../../../services/data/orders/order.service";
import {firstValueFrom} from "rxjs";
import {CartsService} from "../../../services/data/carts/carts.service";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders: Order[] = [];

  constructor(private userService: UserService, private authService: AuthService, private orderService: OrderService, private cartService: CartsService) {
  }

  async ngOnInit() {
    this.orders = <Order[]>await firstValueFrom(this.orderService.getAll());
    this.orders = this.orders.filter((order) => {
      return !(order.orderId == Number.parseInt(<string>localStorage.getItem("orderId")));
    })


  }

  getTotalPriceOrder(order: Order) {
    return this.orderService.getTotalPriceOrder(order);
  }

  getTotalQuantityOrder(order: Order) {
    return this.orderService.getTotalQuantityOrder(order);
  }

  getTotalPrice() {
    let totalPrice: number = 0;
    if (this.orders) {
      this.orders.forEach((order) => {
        totalPrice += this.getTotalPriceOrder(order);
      })
    }
    return totalPrice;
  }
/////
  getTotalQuantity() {
    let totalQuantity: number = 0;
    if (this.orders) {
      this.orders.forEach((order) => {
        totalQuantity += this.getTotalQuantityOrder(order);
      })
    }
    return totalQuantity;
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order);
    window.location.reload();
  }

}
