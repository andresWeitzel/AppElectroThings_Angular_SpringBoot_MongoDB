import { Injectable } from '@angular/core';


//Variables que se almacenan en el cliente
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor() { }


  //================= TOKEN ===============
public setToken(token:string):void{
  window.sessionStorage.removeItem(TOKEN_KEY);
  window.sessionStorage.setItem(TOKEN_KEY,token);
}
public getToken(): string{
  return sessionStorage.getItem(TOKEN_KEY)!;
}


  //================= USERNAME ===============
  public setUsername(username:string):void{
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY,username);
  }
  public getUsername(): string{
    return sessionStorage.getItem(USERNAME_KEY)!;
  }

  //================= AUTHORITIES ===============
  public setAuthorities(authorities:string[]):void{
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY,JSON.stringify(authorities));
  }
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)!).forEach((authority: any) => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;

  }

  public logOut() : void{
    window.sessionStorage.clear();
  }


}
