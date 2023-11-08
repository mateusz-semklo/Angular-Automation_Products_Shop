import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from "../../../services/shopping-cart/shopping-cart.service";
import {Order} from "../../../models/Order";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth/auth.service";
import {UserService} from "../../../services/data/users/user.service";
import {User} from "../../../models/User";
import {firstValueFrom} from "rxjs";
import {OrderService} from "../../../services/data/orders/order.service";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: Order | null = null;
  user: User | null = null;

  form: FormGroup = new FormGroup({
      orderStreet: new FormControl('', Validators.required),
      orderCity: new FormControl('', Validators.required),
      orderPostCode: new FormControl('', Validators.required),
      orderCountry: new FormControl('', Validators.required)
    }
  )

  constructor(private shoppingService: ShoppingCartService, private router: Router, private authService: AuthService, private userService: UserService, private orderService: OrderService) {
  }

  async ngOnInit() {
    this.cart = await this.shoppingService.getCart();
    if (this.authService.currentUser()) {
      this.user = <User>await firstValueFrom(this.userService.getById(<string>this.authService.currentUser()));
      if (this.user) {
        this.form.get("orderStreet")?.setValue(this.user.userStreet);
        this.form.get("orderPostCode")?.setValue(this.user.userPostCode);
        this.form.get("orderCity")?.setValue(this.user.userCity);
        this.form.get("orderCountry")?.setValue(this.user.userCountry);
      }
    }
  }

  async checkout() {
    if (this.cart) {
      this.cart.user = <User>this.user;
      this.cart.orderStreet = this.form.get("orderStreet")?.value;
      this.cart.orderPostCode = this.form.get("orderPostCode")?.value;
      this.cart.orderCity = this.form.get("orderCity")?.value;
      this.cart.orderCountry = this.form.get("orderCountry")?.value;
      this.orderService.update(this.cart, Number.parseInt(<string>localStorage.getItem("orderId")));
      if (localStorage.getItem("orderId")) localStorage.removeItem("orderId");
    }
    await this.router.navigate(["/user/order-success",this.user?.username]);

  }

  async delete() {
    await this.shoppingService.deleteCart();
    await this.router.navigate(["/"]);
  }


}
