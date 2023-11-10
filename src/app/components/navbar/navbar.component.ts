import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {from, Observable, Subscription} from "rxjs";
import {Order} from "../../models/Order";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  collapsed = true;
  quantity: number = 0;
  private subscriptionQuantity: Subscription = new Subscription();

  constructor(public authService: AuthService, public shoppingCartService: ShoppingCartService) {
  }
  async ngOnInit() {
    this.subscriptionQuantity = this.shoppingCartService.getObservableQuantity().subscribe((quantity) => {
      this.quantity = quantity;
    })
  }
  ngOnDestroy(): void {
    this.subscriptionQuantity.unsubscribe();
  }
  async logout(){
    await this.authService.logout();
  }
}
