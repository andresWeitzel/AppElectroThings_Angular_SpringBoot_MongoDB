import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DolarService {
  urlDolarApi: string = environment.URL_DOLAR_API;

  constructor(private httpClient: HttpClient) {}

  //================ METODOS CRUD ====================

  //--Get Dolar Compra--
  async getDolarCompra(){
        const dolar = await fetch(this.urlDolarApi);
        const dolarJson = await dolar.json();
        return dolarJson[0].casa.compra;
  }
    //--Get Dolar Venta--
    async getDolarVenta(){
      const dolar = await fetch(this.urlDolarApi);
      const dolarJson = await dolar.json();
      return dolarJson[0].casa.venta;
}

}
