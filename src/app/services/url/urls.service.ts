import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlsService {

  urls:Map<string,string>;
  serverUrl:string="http://localhost:8080";
  constructor() {
    this.urls = new Map();
    this.urls.set("images",this.serverUrl);
    this.urls.set("products",this.serverUrl+"/products");
    this.urls.set("carts",this.serverUrl+"/carts");
    this.urls.set("users",this.serverUrl+"/users");
    this.urls.set("orders",this.serverUrl+"/orders");
    this.urls.set("categories",this.serverUrl+"/categories");
    this.urls.set("authenticate",this.serverUrl+"/authenticate");
  }
}
