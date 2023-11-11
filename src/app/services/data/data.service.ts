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
  constructor(private httpClient: HttpClient, @Inject(String) private url: string) {
  }

  getAll() {
    return this.httpClient.get(this.url, {
      observe: "response",
      responseType: "json",
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error: HttpResponse<any>) => {
          throw this.handleError(error);
        })
      )
  }

  getById(id: number | string) {
    return this.httpClient.get(this.url + '/' + id, {
      observe: "response",
      responseType: "json",
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error: HttpResponse<any>) => {
          throw this.handleError(error);
        })
      )
  }

  create(resource: any) {
    return this.httpClient.post(this.url, resource, {
      observe: "response",
      responseType: "json",
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error: HttpResponse<any>) => {
          throw this.handleError(error);
        })
      )

  }

  update(resources: any, id: number) {
    return this.httpClient.put(this.url + '/' + id, resources, {
      observe: "response",
      responseType: "json",
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error: HttpResponse<any>) => {
          throw this.handleError(error);
        })
      )

  }

  delete(id: number) {
    return this.httpClient.delete(this.url + '/' + id, {
      observe: "response",
      responseType: "json",
      headers: {"Authorization": "Bearer " + localStorage.getItem("token")}
    })
      .pipe(
        map((response) => {
          return response.body;
        }),
        catchError((error: HttpResponse<any>) => {
          throw this.handleError(error);
        })
      )

  }

  handleError(error: HttpResponse<any>) {
    if (error.status === 400) {
      console.log("400 error");
      return new BadRequestError(error);
    } else if (error.status === 401) {
      console.log("401 error");
      return new UnauthorizedError(error);
    } else if (error.status === 403) {
      console.log("403 error");
      return new ForbiddenError(error);
    } else if (error.status === 404) {
      console.log("404 error");
      return new NotFoundError(error);
    } else {
      console.log("Other error");
      return new AppError(error);
    }
  }

}
