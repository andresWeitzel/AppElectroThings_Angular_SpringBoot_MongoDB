import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginUsuarioDto } from 'src/app/models/login-usuario-dto';
import { SigninUsuarioDto } from 'src/app/models/signin-usuario-dto';
import { JwtDto } from 'src/app/models/jwt-dto';
import { environment } from 'src/environments/environment';




const urlAuthApi : string = environment.URL_AUTH_API;



@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private httpClient : HttpClient) {  }



  //================= SIGNIN ===============
 public signin(signinUsuario : SigninUsuarioDto): Observable<SigninUsuarioDto>{
  return this.httpClient.post<SigninUsuarioDto>(urlAuthApi + 'signin' , signinUsuario).pipe(catchError(this.handleError));
 }
//================= LOGIN ===============
public login(loginUsuario : LoginUsuarioDto) : Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(urlAuthApi + 'login',loginUsuario).pipe(catchError(this.handleError));
}




private handleError(httpError: HttpErrorResponse) {
  if (httpError.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('Ha ocurrido un error:', httpError.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend devuelve el código ${httpError.status}, ` +
      `a causa de : ${httpError.error}`);
  }
  // Return an observable with a user-facing error message.
  return throwError('Algo inesperado ha ocurrido , por favor intente nuevamente en unos minutos.');
}

}
