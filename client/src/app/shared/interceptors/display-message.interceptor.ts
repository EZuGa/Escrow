import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { SnackbarManagmentService } from '../services/snackbar-managment/snackbar-managment.service';

@Injectable()
export class DisplayMessageInterceptor implements HttpInterceptor {

  constructor(private snackBar: SnackbarManagmentService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{        
        if(error instanceof HttpErrorResponse){
          const message = this.getMessage(error.error);
          this.snackBar.openAlert(message);
        }
        return throwError(()=>error)
      }),
    );  
  }

   getMessage(obj: any) : string{
    const objectValue = Object.values(obj)[0];
    if(typeof objectValue === "string"){
        return objectValue;
    }else{
        return this.getMessage(objectValue)
    }
}
}
