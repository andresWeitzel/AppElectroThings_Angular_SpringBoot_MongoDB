import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ProductoDTO } from '../../models/producto-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  urlProductosApi: string = environment.URL_PRODUCTOS_API;

  constructor(private httpClient: HttpClient) {}

  //================ METODOS CRUD ====================

  //--- GET ALL ---
  public listado(
    nroPagina: number,
    nroElementos: number,
    orderType: string,
    orderBy: string
  ): Observable<ProductoDTO[]> {
    return this.httpClient.get<any>(
      `${this.urlProductosApi}listado?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
    );
  }

  //--- GET ALL FILTER AND FIELD---
  //----APLICA TODOS LOS METODOS DE BUSQUEDA-----
  public listadoFilterAndField(
    campo: string,
    filtro: string,
    nroPagina: number,
    nroElementos: number,
    orderType: string,
    orderBy: string
  ): Observable<ProductoDTO[]> {
    return this.httpClient.get<any>(
      `${this.urlProductosApi}${campo}/${filtro}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
    );
  }


  //--- GET STOCK BY CATEG---
  public stockByCateg(
    categoria: string,
    nroPagina: number,
    nroElementos: number,
    orderType: string,
    orderBy: string
  ): Observable<number> {
    return this.httpClient.get<number>(
      `${this.urlProductosApi}stock-por-categoria/${categoria}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
    );
  }

    //--- GET STOCK BY MARCA---
    public stockByMarca(
      marca: string,
      nroPagina: number,
      nroElementos: number,
      orderType: string,
      orderBy: string
    ): Observable<number> {
      return this.httpClient.get<number>(
        `${this.urlProductosApi}stock-por-marca/${marca}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
      );
    }

  //--- GET STOCK BY FECHA---
  public stockByFecha(
    fecha: string,
    nroPagina: number,
    nroElementos: number,
    orderType: string,
    orderBy: string
  ): Observable<number> {
    return this.httpClient.get<number>(
      `${this.urlProductosApi}stock-por-fecha/${fecha}?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
    );
  }


  //--- ADD ---
  public add(producto: ProductoDTO): Observable<ProductoDTO> {
    return this.httpClient.post<any>(`${this.urlProductosApi}`, producto);
  }

  //--- UPDATE ---
  public update(id: string, producto: ProductoDTO): Observable<ProductoDTO> {
    return this.httpClient.put<any>(`${this.urlProductosApi}${id}`, producto);
  }

  //--- DELETE ---
  public delete(id: string): Observable<ProductoDTO> {
    return this.httpClient.delete<any>(`${this.urlProductosApi}${id}`);
  }

  //================ METODOS DE BUSQUEDA ====================

  //Lista de Productos desde Spring
  public graficoStockMarca(
    nroPagina: number,
    nroElementos: number,
    orderType: string,
    orderBy: string
  ): Observable<any> {
    return this.httpClient.get<any>(
      `${this.urlProductosApi}grafico-stock-marca?page=${nroPagina}&size=${nroElementos}&sort=${orderType},${orderBy}`
    );
  }
}
