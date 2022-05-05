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
  public listadoProductos(page:number , size:number , order:string, asc:boolean):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${URL_PRODUCTOS}/listado?page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }


}
