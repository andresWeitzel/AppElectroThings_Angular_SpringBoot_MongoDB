import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Producto } from 'src/app/services/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { IProducto } from 'src/app/shared/models/iproducto.interface';

@Component({
  selector: 'app-listado-componentes',
  templateUrl: './listado-componentes.component.html',
  styleUrls: ['./listado-componentes.component.css']
})
export class ListadoComponentesComponent implements OnInit {

  navigationExtras : NavigationExtras = {

      state : {
        value :null
      }
  };


  //Array de Productos
  testData : any[]=[];


  constructor(private router: Router, private productoService:ProductosService) { }

  ngOnInit(): void {

    this.getAll();

  }

  // Métodos CRUD para los Componentes Electrónicos

  // Mostrar Productos
  detallesProducto(producto : any): void{
    this.navigationExtras.state.value = producto;
    this.router.navigate(['detalles-componentes'] , this.navigationExtras);
  }

  // Editar Productos
  editarProducto(producto : any): void{
    this.navigationExtras.state.value = producto;
    this.router.navigate(['editar-componentes'] , this.navigationExtras);
  }

  // Eliminar Productos
  eliminarProducto(producto : any): void{
    alert('El Producto ha sido Eliminado');
  }


  private getAll(){
    this.productoService.getAll().subscribe(
      (objeto:any[])=>this.testData = objeto
      );
  }
  }


