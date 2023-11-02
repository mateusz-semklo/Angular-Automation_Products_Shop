import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UrlsService} from "../../url/urls.service";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class CartsService extends DataService{

  constructor(httpClient:HttpClient,private urlService:UrlsService) {
    super(httpClient, <string>urlService.urls.get("carts"));
  }
}
