import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Producto } from 'src/app/services/models/producto';
import { ProductosService } from 'src/app/services/productos/productos.service';


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
  testData : Producto[];

  //Paginado
  nroPage=0;
  size=12;
  order='id';
  asc=true;


  constructor(private router: Router, private productoService:ProductosService) { }

  ngOnInit() {

    this.getAll();
  }

  // Métodos CRUD para los Componentes Electrónicos

  //Obtener Productos
   getAll(){
    this.productoService.listadoProductos(this.nroPage,this.size,this.order,this.asc).subscribe(
      (data:any)=>{
        this.testData = data.content;
        console.log(this.testData);
      },
      (err)=>{
        console.log(err.error);
      }
      );
  }

  sortBy(tipo:string):void{

    this.testData=[];
    this.order = tipo;
    this.getAll();
  }


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



  }


