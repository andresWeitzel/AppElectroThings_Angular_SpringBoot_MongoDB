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
  testData : Producto[]=[];

  //Paginado
  nroPage=0;
  size=15;
  sort='id';
  asc=true;


  constructor(private router: Router, private productoService:ProductosService) { }

  ngOnInit() {

    this.getAll();
  }



  //=============METODOS CRUD========================

  //Obtener Productos
   getAll(){
    this.productoService.listadoProductos(this.nroPage,this.size,this.sort,this.asc).subscribe(
      (data:any)=>{
        this.testData = data.content;
        console.log(this.testData);
      },
      (err)=>{
        console.log(err.error);
      }
      );
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

//==================== METODOS PAGINACION ==============


  //Ordenar los registros por tipo
  sortBy(tipo:string):void{
    this.sort = tipo;
    this.getAll();
  }



  }


