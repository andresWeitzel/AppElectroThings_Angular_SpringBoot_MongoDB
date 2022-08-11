
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterEvent, RouterState } from '@angular/router';
import { request } from 'http';
import { NgToastService } from 'ng-angular-popup';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, retry } from 'rxjs/operators';
import { JwtDto } from 'src/app/models/jwt-dto';
import { AuthService } from '../auth/auth.service';
import { TokenService } from '../token/token.service';



const AUTHORIZATION='Authorization';
const BEARER='Bearer ';





@Injectable({
  providedIn: 'root'
})
export class InterceptorsProductosService implements HttpInterceptor{

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router:Router,
    private toast: NgToastService,
    private ngxService: NgxUiLoaderService
  ) {
  }
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {


    //Si no esta logueado interceptamos el sig request
    if (!this.tokenService.isLogged) {
      return next.handle(req);
    }


    const token = this.tokenService.getToken();

    let interceptRequest = req;

   interceptRequest = this.addToken(req , token);

    //manejamos los request...controlamos en caso de error
    return next.handle(interceptRequest).pipe(
      catchError((err:HttpErrorResponse) => {
        if (err.status == 401) {

          this.spinLoader();

          const jwtDto: JwtDto = new JwtDto(this.tokenService.getToken());

          return this.authService.refreshToken(jwtDto).pipe(
            concatMap((data: any) => {
              console.log('refresh-token');

              this.tokenService.setToken(data.token);

              interceptRequest = this.addToken(req , data.token);

              return next.handle(interceptRequest);
            })
          );
        } else {

          if(!(this.router.url == '/signin')
          && !(this.router.url == '/login')){

            this.tokenService.logOut();
          }


          this.toastError(err.error);

          //return throwError(err);
        }
      })
    );
  }



  //============== UTILS =======================


  private addToken( req: HttpRequest<unknown>, token:string) : HttpRequest<any>{

    return req.clone(({headers : req.headers.set(
      AUTHORIZATION,
      BEARER + token)}));
  }



  private spinLoader(){
       //SPIN LOADING
       this.ngxService.start();
       setTimeout(() => {
         this.ngxService.stop();
       }, 100);
       //FIN SPIN LOADING
  }

  private toastError(respuesta:string){
        //TOAST ERROR
        setTimeout(() => {
          this.toast.error({
            detail: 'ERROR',
            summary: respuesta,
            duration: 2000,
          });
        }, 600);
        //FIN TOAST ERROR
  }





}

export const interceptorProvider = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorsProductosService,
    multi: true,
  },
];
