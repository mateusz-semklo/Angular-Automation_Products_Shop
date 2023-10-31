import {Inject, Injectable} from '@angular/core';
import {DataService} from "../data.service";
import {HttpClient} from "@angular/common/http";
import {UrlsService} from "../../url/urls.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataService{

  constructor(httpClient:HttpClient, urlService:UrlsService) {
    super(httpClient, <string>urlService.urls.get("categories"));
  }
}
