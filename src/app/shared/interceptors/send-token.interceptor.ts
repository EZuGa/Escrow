import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SendTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(httpRequest: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(httpRequest);
    const token = localStorage.getItem("auth_token");

    if(!token || httpRequest.url.includes("jwt")) {
      return next.handle(httpRequest.clone())
    };

    return next.handle(httpRequest.clone({ setHeaders: { 'Authorization' : `Bearer ${token}` } }));  }
}
