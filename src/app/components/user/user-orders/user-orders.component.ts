import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/data/orders/order.service";
import {UserService} from "../../../services/data/users/user.service";
import {User} from "../../../models/User";
import {AuthService} from "../../../services/auth/auth.service";
import {NgIf} from "@angular/common";
import {firstValueFrom} from "rxjs";
import {Order} from "../../../models/Order";

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{

  user:User|null=null;
  orders:Order[]=[];
  constructor(private userService:UserService,private authService:AuthService,private orderService:OrderService) {}

  async ngOnInit() {
    this.user=<User> await firstValueFrom(this.userService.getById(<string>this.authService.currentUser()));
    if(this.user){
      this.orders=this.user.orders;
    }
  }

  getTotalPriceOrder(order:Order){
    return this.orderService.getTotalPriceOrder(order);
  }
  getTotalQuantityOrder(order:Order){
    return this.orderService.getTotalQuantityOrder(order);
  }
  getTotalPrice(){
    let totalPrice:number=0;
    if(this.orders) {
      this.orders.forEach((order)=>{
        totalPrice+=this.getTotalPriceOrder(order);
      })
    }
    return totalPrice;
  }

  getTotalQuantity(){
    let totalQuantity:number=0;
    if(this.orders) {
      this.orders.forEach((order)=>{
        totalQuantity+=this.getTotalQuantityOrder(order);
      })
    }
    return totalQuantity;
  }


}
