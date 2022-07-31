import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductoDTO } from '../../models/producto-dto';


const URL_PRODUCTOS_BASE="http://localhost:8098/api/v1/productos/";



@Injectable({
  providedIn: 'root'
})
export class ProductosService {



  constructor(private httpClient : HttpClient) { }


//================ METODOS CRUD ====================


  //--- GET ALL ---
  public listado(nroPagina:number , nroElementos:number , orderType:string, orderBy:string):Observable<ProductoDTO[]>{
    return this.httpClient.get<any>(`${URL_PRODUCTOS_BASE}listado?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- GET ALL FILTER---
  public listadoFilter(filtro:string, nroPagina:number , nroElementos:number , orderType:string, orderBy:string ):Observable<ProductoDTO[]>{
    return this.httpClient.get<any>(`${URL_PRODUCTOS_BASE}listado-filter/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- ADD ---
public add(producto:ProductoDTO):Observable<ProductoDTO>{
  return this.httpClient.post<any>(`${URL_PRODUCTOS_BASE}`,producto);
}

//--- UPDATE ---
  public update(id:number, producto:ProductoDTO):Observable<ProductoDTO>{
    return this.httpClient.put<any>(`${URL_PRODUCTOS_BASE}${id}`,producto);

  }

  //--- DELETE ---
  public delete(id:string):Observable<ProductoDTO>{
    return this.httpClient.delete<any>(`${URL_PRODUCTOS_BASE}${id}`);

  }


  //================ METODOS DE BUSQUEDA ====================


    //Lista de Productos desde Spring
    public graficoStockMarca():Observable<any>{
      return this.httpClient.get<any>(`${URL_PRODUCTOS_BASE}/grafico-stock-marca`);
    }


}
