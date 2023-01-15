import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginUsuarioDto } from 'src/app/models/login-usuario-dto';
import { SigninUsuarioDto } from 'src/app/models/signin-usuario-dto';
import { JwtDto } from 'src/app/models/jwt-dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


urlAuthApi : string = environment.URL_AUTH_API;



  constructor(private httpClient : HttpClient) {  }



  //================= SIGNIN ===============
 public signin(signinUsuario : SigninUsuarioDto): Observable<SigninUsuarioDto>{
  return this.httpClient.post<SigninUsuarioDto>(this.urlAuthApi + 'signin' , signinUsuario);
 }
//================= LOGIN ===============
public login(loginUsuario : LoginUsuarioDto) : Observable<JwtDto>{
  return this.httpClient.post<JwtDto>(this.urlAuthApi + 'login',loginUsuario);
}

  //================= REFRESH_TOKEN ===============
  public refreshToken(jwtDto : JwtDto) : Observable<JwtDto>{
    return this.httpClient.post<JwtDto>(this.urlAuthApi + 'refresh-token', jwtDto);
  }




}
