import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private tokenService:TokenService,
    private router:Router
    ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{

      if(this.tokenService.isLogged()){

        this.router.navigate(['inicio-componentes']);

        return false;
      }
      return true;
    }

}

