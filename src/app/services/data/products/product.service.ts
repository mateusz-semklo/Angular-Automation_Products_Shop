import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DataService} from "../data.service";
import {UrlsService} from "../../url/urls.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends DataService{
  constructor(httpClient:HttpClient,urlService:UrlsService) {
    super(httpClient, <string>urlService.urls.get("products"));
  }
}
