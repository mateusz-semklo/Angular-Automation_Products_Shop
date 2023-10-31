import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {BadRequestError} from "../../common/errors/BadRequestError";
import {UnauthorizedError} from "../../common/errors/UnauthorizedError";
import {ForbiddenError} from "../../common/errors/ForbiddenError";
import {NotFoundError} from "../../common/errors/NotFoundError";
import {AppError} from "../../common/errors/AppError";
import {catchError, map} from "rxjs";
import {Category} from "../../models/Category";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient:HttpClient,@Inject(String) private url:string) {
  }
  getAll(){
    return this.httpClient.get(this.url,{observe:"response",responseType:"json",headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
        .pipe(
            map((response)=>{
                return response.body;
            }),
            catchError((error:HttpResponse<any>)=>{throw this.handleError(error);})
        )
  }
    getById(id:string){
        return this.httpClient.get(this.url+'/'+id,{observe:"response",responseType:"json",headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
            .pipe(
                map((response)=>{
                    return response.body;
                }),
                catchError((error:HttpResponse<any>)=>{throw this.handleError(error);})
            )
    }
  create(resource:any){
      return this.httpClient.post(this.url,resource,{observe:"response",responseType:"json",headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
          .pipe(
              map((response)=>{
                  return response.body;
              }),
              catchError((error:HttpResponse<any>)=>{throw this.handleError(error);})
          )

  }
  update(resources:any,id:string){
      return this.httpClient.put(this.url+'/'+id,resources,{observe:"response",responseType:"json",headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
          .pipe(
              map((response)=>{
                  return response.body;
              }),
              catchError((error:HttpResponse<any>)=>{throw this.handleError(error);})
          )

  }
  delete(id:string){
      return this.httpClient.delete(this.url+'/'+id,{observe:"response",responseType:"json",headers:{"Authorization":"Bearer "+localStorage.getItem("token")}})
          .pipe(
              map((response)=>{
                  return response.body;
              }),
              catchError((error:HttpResponse<any>)=>{throw this.handleError(error);})
          )

  }

  handleError(error:HttpResponse<any>) {
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
