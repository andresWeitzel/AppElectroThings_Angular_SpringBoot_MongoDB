import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Producto } from '../models/producto';


const URL_PRODUCTOS="http://localhost:8098/v1/productos";



@Injectable({
  providedIn: 'root'
})
export class ProductosService {



  constructor(private http : HttpClient) { }

  //Lista de Productos desde Spring
  public listadoProductos(nroPagina:number , nroElementos:number , ordenacion:string, ascendente:boolean):Observable<Producto>{
    return this.http.get<any>(`${URL_PRODUCTOS}/listado?page=${nroPagina}&size=${nroElementos}&sort=${ordenacion}&asc=${ascendente}`);
  }



    //Lista de Productos desde Spring
    public graficoStockMarca(nroPagina:number , nroElementos:number , ordenacion:string, ascendente:boolean):Observable<Producto>{
      return this.http.get<any>(`${URL_PRODUCTOS}/grafico-stock-marca?page=${nroPagina}&size=${nroElementos}&sort=${ordenacion}&asc=${ascendente}`);
    }


}
