import { Injectable, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import{UserService} from './user.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private authService: UserService;
  public currentLang: any;

  constructor(
    private injector: Injector,
    public activatedRoute: ActivatedRoute, 
  ) {
    
    
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("reached here at interceptor")
    this.authService = this.injector.get(UserService); // get it here within intercept
    let token = localStorage.user_login ? JSON.parse(localStorage.user_login).token : 'undefined';
  
    const authRequest = request.clone({
      headers: request.headers.set('authorization', token)
       
    });

    return next.handle(authRequest);
  }
}