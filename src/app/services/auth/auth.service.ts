import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {catchError, elementAt, map, Observable} from "rxjs";
import {AppError} from "../../common/errors/AppError";
import {UnauthorizedError} from "../../common/errors/UnauthorizedError";
import {ForbiddenError} from "../../common/errors/ForbiddenError";
import {BadRequestError} from "../../common/errors/BadRequestError";
import {NotFoundError} from "../../common/errors/NotFoundError";
import * as jose from 'jose';
import {Router} from "@angular/router";
import {UrlsService} from "../url/urls.service";
import {ShoppingCartService} from "../shopping-cart/shopping-cart.service";
import {Order} from "../../models/Order";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = <string>this.urlService.urls.get("authenticate");

  constructor(private httpClient: HttpClient, private router: Router, private urlService: UrlsService, private shoppingCartService: ShoppingCartService) {
  }

  login(credentials: { username: string, password: string }) {
    return this.httpClient.post(this.url, credentials, {responseType: "text", observe: "response"})
      .pipe(
        map((response) => {
            if (response && response.body) {
              localStorage.setItem("token", response.body);
              return true;
            } else
              return false;
          }
        )
        , catchError((error: Response) => {
          throw this.handleError(error);
        })
      )
  }

  async logout() {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      await this.shoppingCartService.deleteCart();
      window.location.reload();
      await this.router.navigate(["/"])
    }
  }

  currentUser() {
    let token = localStorage.getItem("token");
    if (!token)
      return null;

    return jose.decodeJwt(token).sub;
  }

  isAdmin() {
    if (!this.isLoggedIn())
      return false;

    let token = localStorage.getItem("token");
    if (token != null) {
      let role: string = <string>jose.decodeJwt(token).aud;
      if (role.includes("ROLE_ADMIN"))
        return true;
    }
    return false;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token != null) {
      let expirationDate: number = <number>jose.decodeJwt(token).exp;
      let issueDate = <number>jose.decodeJwt(token).iat;
      if (expirationDate >= issueDate) {
        return true;
      }
    }
    return false;
  }


  private handleError(error: Response) {
    if (error.status === 400)
      return new BadRequestError(error);
    if (error.status === 401)
      return new UnauthorizedError(error);
    if (error.status === 403)
      return new ForbiddenError(error);
    if (error.status === 404)
      return new NotFoundError(error);
    else return new AppError(error);
  }
}
