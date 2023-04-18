import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  
  constructor(private loginService:LoginService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const myToken = localStorage.getItem('token');
      if (myToken) {

        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.loginService.getToken()}`
          }
        });
  
          return next.handle(req);
      }
      else {
          return next.handle(req);
      }
  }
}

export const loginInterceptorProvider = {
  provide : HTTP_INTERCEPTORS,
  useClass : LoginInterceptor,
  multi : true
}
