//External
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DolarService {
  urlDolarApi: string = environment.URL_DOLAR_API;

  constructor() {}

  async getDolarBuy() {
    let dolar = await fetch(this.urlDolarApi);
    let dolarJson = await dolar.json();
    dolarJson = dolarJson[0].casa.compra;
    let dolarJsonFormat = dolarJson.replace(/,/g, ".");
    return dolarJsonFormat;
  }
  async getDolarSale() {
    let dolar = await fetch(this.urlDolarApi);
    let dolarJson = await dolar.json();
    dolarJson = dolarJson[0].casa.venta;
    let dolarJsonFormat = dolarJson.replace(/,/g, ".");
    return dolarJsonFormat;
  }
}
