import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HandleUnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error instanceof HttpErrorResponse && error.status === 401){
          localStorage.clear();
          this.router.navigateByUrl('');
        }

        return of(error)
      }),
    );
  }
}
