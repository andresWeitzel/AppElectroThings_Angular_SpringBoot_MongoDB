import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorsProductosService implements HttpInterceptor{

  constructor(
    private tokenService: TokenService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let interceptRequest = req;
    const token = this.tokenService.getToken();

    if(token!=null){

      interceptRequest = req.clone({headers:req.headers.set('Authorization','Bearer '+token)});
    }

    return next.handle(interceptRequest);

  }
}

export const interceptorProvider=[{provide:HTTP_INTERCEPTORS, useClass:InterceptorsProductosService, multi:true}]
