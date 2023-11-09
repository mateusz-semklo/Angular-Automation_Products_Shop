import {Component, OnDestroy} from '@angular/core';
import {Order} from "./models/Order";
import {OrderService} from "./services/data/orders/order.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'AutomationShop';

  constructor(private orderService:OrderService) {
  }
  ngOnDestroy(): void {
    let orderId:number=Number.parseInt(<string>localStorage.getItem("orderId"));

  }
}
