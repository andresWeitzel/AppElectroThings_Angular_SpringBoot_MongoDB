import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageEncryptedService } from './storage-enccrypted/storage-encrypted.service';


//Variables que se almacenan en el cliente
const TOKEN_KEY = 'AuthToken';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string> = [];

  constructor(
    private router:Router,
    private storageService:StorageEncryptedService
    ) { }


  //================= TOKEN ===============
public setToken(token:string):void{
  this.storageService.secureStorage.removeItem(TOKEN_KEY);
  this.storageService.secureStorage.setItem(TOKEN_KEY, token);
}

public getToken(): string{
  return this.storageService.secureStorage.getItem(TOKEN_KEY);
}


//=========== LOGIN =============
public isLogged():boolean{

  if(this.getToken() == null){
    return false;
  }
  else if(this.getToken()){
    return true;
  }

    return false;

}

  //========= USERNAME ===========

  public getUsername(): string{

    if(!(this.isLogged)){
      return null;
    }

    const token = this.getToken();
    //console.log('TOKEN',token);
    const checkToken:boolean =
     (token === null || token.length <= 0)
     ? false : true;
    //console.log('CHECK TOKEN',token);


    if(checkToken){

      const payload = token.split('.')[1];
      //console.log('TOKEN PAYLOAD',payload);
      const payloadDecoded = atob(payload);
      //console.log('TOKEN PAYLOAD DECODED',payloadDecoded);
      const values = JSON.parse(payloadDecoded);
     //console.log('TOKEN VALORES',values);
      const username = values.sub;
      //console.log('TOKEN ROLES',username);

      return username;
    }

    return null;

  }


  //============== ROLES =================

  public isAdmin(): boolean{

    if(!(this.isLogged)){
      return false;
    }
    const token = this.getToken();
    //console.log('TOKEN',token);
    const checkToken:boolean =
     (token === null || token.length <= 0)
     ? false : true;
    //console.log('CHECK TOKEN',token);


    if(checkToken){

    const payload = token.split('.')[1];
    //console.log('TOKEN PAYLOAD',payload);
    const payloadDecoded = atob(payload);
    //console.log('TOKEN PAYLOAD DECODED',payloadDecoded);
    const values = JSON.parse(payloadDecoded);
    //console.log('TOKEN VALORES',values);
    const roles = values.roles;
    //console.log('TOKEN ROLES',roles);

    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }

    return true;
  }
  return null;
  }





  public isUser(): boolean{

    if(!(this.isLogged)){
      return false;
    }
    const token = this.getToken();
    //console.log('TOKEN',token);
    const checkToken:boolean =
    (token === null || token.length <= 0)
    ? false : true;
   //console.log('CHECK TOKEN',token);


   if(checkToken){

    const payload = token.split('.')[1];
    //console.log('TOKEN PAYLOAD',payload);
    const payloadDecoded = atob(payload);
    //console.log('TOKEN PAYLOAD DECODED',payloadDecoded);
    const values = JSON.parse(payloadDecoded);
    //console.log('TOKEN VALORES',values);
    const roles = values.roles;
    //console.log('TOKEN ROLES',roles);

    if (roles.indexOf('ROLE_USER') < 0) {
      return false;
    }
    return true;
  }
  return null;
  }






  public logOut() : void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.clear();
    this.router.navigate(['/login']);

  }


}
