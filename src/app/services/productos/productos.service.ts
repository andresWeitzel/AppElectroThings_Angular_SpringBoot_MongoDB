import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductoDTO } from '../../models/producto-dto';



@Injectable({
  providedIn: 'root'
})
export class ProductosService {


 urlProductosApi : string = environment.URL_PRODUCTOS_API;



  constructor(private httpClient : HttpClient) { }


//================ METODOS CRUD ====================


  //--- GET ALL ---
  public listado(nroPagina:number , nroElementos:number , orderType:string, orderBy:string):Observable<ProductoDTO[]>{
    return this.httpClient.get<any>(`${this.urlProductosApi}listado?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- GET ALL FILTER---
  public listadoFilter(filtro:string, nroPagina:number , nroElementos:number , orderType:string, orderBy:string ):Observable<ProductoDTO[]>{
    return this.httpClient.get<any>(`${this.urlProductosApi}listado-filter/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }


    //--- GET ALL FILTER AND FIELD---
  //----APLICA TODOS LOS METODOS DE BUSQUEDA-----
  public listadoFilterAndField(filtro:string, campo:string, nroPagina:number , nroElementos:number , orderType:string, orderBy:string ):Observable<ProductoDTO[]>{
    return this.httpClient.get<any>(`${this.urlProductosApi}${campo}/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`);
  }

//--- ADD ---
public add(producto:ProductoDTO):Observable<ProductoDTO>{
  return this.httpClient.post<any>(`${this.urlProductosApi}`,producto);
}

//--- UPDATE ---
  public update(id:string, producto:ProductoDTO):Observable<ProductoDTO>{
    return this.httpClient.put<any>(`${this.urlProductosApi}${id}`,producto);

  }

  //--- DELETE ---
  public delete(id:string):Observable<ProductoDTO>{
    return this.httpClient.delete<any>(`${this.urlProductosApi}${id}`);

  }


  //================ METODOS DE BUSQUEDA ====================


    //Lista de Productos desde Spring
    public graficoStockMarca():Observable<any>{
      return this.httpClient.get<any>(`${this.urlProductosApi}/grafico-stock-marca`);
    }


}
