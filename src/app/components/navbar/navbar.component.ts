import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ShoppingCartService} from "../../services/shopping-cart/shopping-cart.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  quantity: number = 0;
  private subscriptionName: Subscription = new Subscription();

  constructor(public authService: AuthService, private shoppingCartService: ShoppingCartService) {
  }
  ngOnInit() {
    this.subscriptionName = this.shoppingCartService.getUpdate().subscribe((quantity) => {
      this.quantity = quantity;
    })
  }
  ngOnDestroy(): void {
    this.subscriptionName.unsubscribe();
  }
}
