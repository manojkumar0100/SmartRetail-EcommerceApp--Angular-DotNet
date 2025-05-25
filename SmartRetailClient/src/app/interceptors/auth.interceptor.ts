import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  

    if(request.method == 'POST' && (request.url === 'http://localhost:59012/api/Auth/Login'))
    {
      return next.handle(request);
    }
    const token  = localStorage.getItem('authToken');
    request = request.clone({headers : new HttpHeaders({Authorization: "Bearer "+token })});
    if(request.url=='http://localhost:59012/api/Admin')
    {
      request = request.clone({headers : new HttpHeaders({Authorization: "Bearer "+localStorage.getItem('adminauthToken') })});
    }

    
    
    //console.log('Request Interceptor',request);
    return next.handle(request);
  }
}
