import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from 'src/app/shared/models/iproducto.interface';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private urlProductos="http://localhost:8098/v1/productos/listado"

  constructor(private httpClient : HttpClient) { }

  //Lista de Productos desde Spring
  getAll():Observable<any[]>{
    return this.httpClient.get<any[]>(this.urlProductos);
  }


}
