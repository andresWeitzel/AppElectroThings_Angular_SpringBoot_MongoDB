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
  productos : Producto[]=[];

  //Paginado
  nroPagina=0;
  nroElementos=10;
  ordenacion='id';
  ascendente=true;

  primeraPagina=false;
  ultimaPagina=false;


  constructor(private router: Router, private productoService:ProductosService) { }

  ngOnInit() {

    this.listadoProductos();
  }



  //=============METODOS CRUD========================

  //Obtener Productos
   listadoProductos(){
    this.productoService.listadoProductos(this.nroPagina,this.nroElementos,this.ordenacion,this.ascendente).subscribe(
      (registros:any)=>{
        this.productos = registros.content;
        this.primeraPagina = registros.first;
        this.ultimaPagina = registros.last;

        console.log(this.productos);
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
  ordenacionTipo(tipo:string):void{
    this.ordenacion = tipo;
    this.listadoProductos();
  }


  //Pagina Anterior
  paginaAnterior():void{
    if(!this.primeraPagina){
this.nroPagina--;
this.listadoProductos();
    }
  }

    //Pagina Anterior
    paginaSiguiente():void{
      if(!this.ultimaPagina){
        this.nroPagina++;
        this.listadoProductos();
      }
    }

    cambiarPagina(pagina:number):void{
      this.nroPagina=pagina;
      this.listadoProductos();
    }



  }


